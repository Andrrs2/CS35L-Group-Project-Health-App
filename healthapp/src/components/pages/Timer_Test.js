import React from 'react';
import { withStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TimerIcon from "@material-ui/icons/Timer";
import ListAltIcon from '@material-ui/icons/ListAlt';
import TimerComponent from "../timer/TimerComponent";
import ScheduleComponent from "../timer/ScheduleComponent";
import Timer from 'react-compound-timer';
import numPadZeroToTwoPlaces from '../timer/numPadZeroToTwoPlaces';
import themeDict from '../theme/themeDict';

const theme = createTheme(themeDict);

const useStyles = theme => ({
  root: {
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
    display: "flex",
    flexFlow: "column",
    alignItems: "stretch"
  },
  page: {
    flexGrow: 1,
  },
});

const pageComponents = {
  "timer": TimerComponent,
  "schedule": ScheduleComponent,
};

class Timer_Test extends React.Component {
  constructor(props) {
    super(props);
    this.timerRef = React.createRef();

    this.state = {
      pageValue: "timer", 
      taskSchedule: [ 
        { name: "Jump", period: 5 },
      ],
      taskElapsedTime: { 
        "Jump": 0,
      },
      current: 0, 
    }

    this.nextTask = this.nextTask.bind(this);
    this.fetchPageData = this.fetchPageData.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.startNextTask = this.startNextTask.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.resetTimerBase = this.resetTimerBase.bind(this);
    this.initScheduleElapsedTime = this.initScheduleElapsedTime.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  initScheduleElapsedTime(newSchedule) {
    let newTaskElapsedTime = {};
    this.state.taskSchedule.forEach((entry) => {
      newTaskElapsedTime[entry.name] = 0;
    });
    this.setState({ taskElapsedTime: newTaskElapsedTime });
  }

  updateSchedule(newSchedule, newSettings) {
    this.setState({ taskSchedule: newSchedule, settings : newSettings}, this.resetTimerBase);
  }

  nextTask(current) {
    const nextIndex = current+1;
    if (nextIndex === this.state.taskSchedule.length) {
      return "Workout Finished!";
    } else {
      return this.state.taskSchedule[nextIndex % this.state.taskSchedule.length].name;
    }
  }

  startNextTask(pause) {
    let current = this.state.current;
    this.timerRef.current.stop();

    let currentTaskElapsedTime = this.state.taskElapsedTime;
    const timeIncrement = Math.round(this.state.taskSchedule[current].period - (this.timerRef.current.getTime() - 999) / 1000); // -999 is needed as we have set our time in timer to have 999 as the checkpoint of task end, /1000 is needed to convert to s, rounding is to clean up the numbers to units of seconds
    currentTaskElapsedTime[this.state.taskSchedule[current].name] += timeIncrement;
    this.setState({taskElapsedTime: currentTaskElapsedTime});

    current += 1;
    const currentModded = current % this.state.taskSchedule.length;
    this.setState({current : currentModded});
    this.timerRef.current.setTime(1000*this.state.taskSchedule[currentModded].period + 999); 
    if (current === this.state.taskSchedule.length) {
    } else {
      this.timerRef.current.start();
    }
  }

  fetchPageData(key, extraData) {
    if (key === "timer") {
      return {
        current : this.state.taskSchedule[this.state.current].name,
        next : this.nextTask(this.state.current),
        ...extraData
      };
    } else if (key === "schedule") {
      return ({
        taskSchedule: this.state.taskSchedule,
        settings: this.state.settings,
      });
    } else {
      return null;
    }
  }

  fetchPageFunc(key) {
    if (key === "timer") {
      return this.startNextTask;
    } else if (key === "schedule") {
      return {
        updateSchedule: this.updateSchedule,
        changePage: this.changePage,
      };
    } else {
      return null;
    }
  }

  resetTimerBase() {
    this.timerRef.current.reset();
  }

  resetTimer() {
    this.timerRef.current.stop(); // Required as the default reset does not stop the timer after resetting
    this.setState({current : 0});
    this.initScheduleElapsedTime(this.state.taskSchedule);
    this.timerRef.current.setTime(1000*this.state.taskSchedule[0].period + 999); // Again, we add 999 to accomodate for how checkpoint is 999
  }

  changePage(key) {
    this.setState({
      pageValue: key
    });
  }

  render() {
    const { classes } = this.props;
    const PageComponent = pageComponents[this.state.pageValue];
    const pageFunc = this.fetchPageFunc(this.state.pageValue);

    return (
      <>
      <ThemeProvider theme={theme}>
        <Box className={classes.root}>
          <Timer
            initialTime={1000*this.state.taskSchedule[this.state.current].period + 999} 
            direction="backward"
            startImmediately={false} 
            onReset={() => {this.resetTimer();}}
            formatValue={numPadZeroToTwoPlaces}
            timeToUpdate={200}
            checkpoints={[
              {
                time: 999,
                callback: () => { this.startNextTask();}
              }
            ]}
            ref={this.timerRef}
          >
            {({ start, stop, reset}) => (
              <PageComponent
                data={this.fetchPageData(this.state.pageValue, {
                  start : start,
                  stop : stop,
                  reset : reset,
                  hr : <Timer.Hours/>,
                  min : <Timer.Minutes/>,
                  sec : <Timer.Seconds/>,
                })}
                func={pageFunc}
              >
              </PageComponent>
            )}
          </Timer>
          <BottomNavigation
            value={this.state.pageValue}
            onChange={(event, newValue) => {this.changePage(newValue)}}
            showLabels
            className={classes.navBar}
          >
            <BottomNavigationAction label="Timer" value="timer" icon={<TimerIcon />} />
            <BottomNavigationAction label="List" value="schedule" icon={<ListAltIcon />} />
          </BottomNavigation>
        </Box>
      </ThemeProvider>
      </>
    );
  }
}

export default withStyles(useStyles)(Timer_Test);

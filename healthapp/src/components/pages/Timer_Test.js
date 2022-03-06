// Import React
import React from 'react';

// Import Google Analytics
import ReactGA from 'react-ga';

// Import Material UI components
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// Import icons
import TimerIcon from "@material-ui/icons/Timer";
import ListAltIcon from '@material-ui/icons/ListAlt';

// Import the 3 pages' custom components
import TimerComponent from "../timer/TimerComponent";
import ScheduleComponent from "../timer/ScheduleComponent";

// Import Timer component and supporting output formatting script
import Timer from 'react-compound-timer';
import numPadZeroToTwoPlaces from '../scripts/numPadZeroToTwoPlaces';

// Import custom theme
import themeDict from '../theme/themeDict';

// Setup Google Analytics
ReactGA.initialize("UA-176706567-3");
ReactGA.pageview(window.location.pathname + window.location.search);

// Setup theme
const theme = createMuiTheme(themeDict);

// Defining styles
const useStyles = theme => ({
  // Covers entire viewport
  root: {
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
    display: "flex",
    flexFlow: "column",
    alignItems: "stretch"
  },

  // Styling for page component if turns out necessary
  page: {
    flexGrow: 1,
  },

  // Styling for navbar if turns out necessary
  navBar: {
  },
});

// Defining a dictionary for the 3 page components
const pageComponents = {
  "timer": TimerComponent,
  "schedule": ScheduleComponent,
};

// App component class
class Timer_Test extends React.Component {
  constructor(props) {
    super(props);

    // Code for allowing parent to use the setTime method of its children
    this.timerRef = React.createRef();

    // State declaration
    this.state = {
      pageValue: "timer", // Default page to display
      taskSchedule: [ // Default tasks in schedule, name is task name, period is task period in seconds
        { name: "Jump", period: 5 },
      ],
      taskElapsedTime: { // Default taskElapsedTime corresponding to default taskSchedule
        "Jump": 0,
      },
      current: 0, // Default index for task, i.e. start by default on first task with index 0 in this.state.taskSchedule}
    }

    // Binding methods to this
    this.nextTask = this.nextTask.bind(this);
    this.fetchPageData = this.fetchPageData.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.startNextTask = this.startNextTask.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.resetTimerBase = this.resetTimerBase.bind(this);
    this.initScheduleElapsedTime = this.initScheduleElapsedTime.bind(this);
    this.changePage = this.changePage.bind(this);
  }


  // Initialises it to have time 0 for all tasks based on the specified schedule
  initScheduleElapsedTime(newSchedule) {
    let newTaskElapsedTime = {};
    this.state.taskSchedule.forEach((entry) => {
      newTaskElapsedTime[entry.name] = 0;
    });
    this.setState({ taskElapsedTime: newTaskElapsedTime });
  }

  // Update schedule alongside its settings
  updateSchedule(newSchedule, newSettings) {
    // Sets the new schedule and settings and only reset timer to reinitialise it after the update is complete
    this.setState({ taskSchedule: newSchedule, settings : newSettings}, this.resetTimerBase);
  }

  // Returns name of next task in schedule given index of current task in taskSchedule
  // current is expected to be an integer index corresponding to the task in the taskSchedule list
  nextTask(current) {
    const nextIndex = current+1;
    if (nextIndex === this.state.taskSchedule.length) {
      return "Workout Finished!";
    } else {
      return this.state.taskSchedule[nextIndex % this.state.taskSchedule.length].name;
    }
  }

  // Updates state such that the next task is started and timer has countdown set to corresponding period, also adds the time of the finished task to corresponding elapsed time entry
  startNextTask(pause) {
    let current = this.state.current;

    // Stop the timer
    this.timerRef.current.stop();

    // Update elapsed time for the completed current task
    let currentTaskElapsedTime = this.state.taskElapsedTime;
    const timeIncrement = Math.round(this.state.taskSchedule[current].period - (this.timerRef.current.getTime() - 999) / 1000); // -999 is needed as we have set our time in timer to have 999 as the checkpoint of task end, /1000 is needed to convert to s, rounding is to clean up the numbers to units of seconds
    currentTaskElapsedTime[this.state.taskSchedule[current].name] += timeIncrement;
    this.setState({taskElapsedTime: currentTaskElapsedTime});

    // Set up next task
    current += 1;
    const currentModded = current % this.state.taskSchedule.length;
    this.setState({current : currentModded});
    this.timerRef.current.setTime(1000*this.state.taskSchedule[currentModded].period + 999); // Again, we add 999 to accomodate for how checkpoint is 999
    if (current === this.state.taskSchedule.length) {
      // Do nothing if schedule has reached its end and settings say no repeat. Elasped time is kept in storage so if you press start the elapsed time will accumulate on the previous run, unless of course you clicked reset
    } else if (pause) {
      // Do nothing as argument was passed to pause
    } else {
      // If not at the end of schedule or repeat is enabled, then after setting up the next task, continue the timer countdown
      this.timerRef.current.start();
    }
  }

  fetchPageData(key, extraData) {
    if (key === "timer") {
      // Extra data attribute is given as a workaround to certain data that cannot be accessed via state in the Timer component
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

  // Calls reset method of the Timer component, differs from resetTimer inm that resetTimer is designed to be called to modify state in App after Timer's reset method is called
  // Hence, calling this method would call the resetTimer method as well
  resetTimerBase() {
    this.timerRef.current.reset();
  }

  // Resets task to first task and clears out elapsed time and setTime
  resetTimer() {
    this.timerRef.current.stop(); // Required as the default reset does not stop the timer after resetting
    this.setState({current : 0});
    this.initScheduleElapsedTime(this.state.taskSchedule);
    this.timerRef.current.setTime(1000*this.state.taskSchedule[0].period + 999); // Again, we add 999 to accomodate for how checkpoint is 999
  }

  // Changes page specified by key
  changePage(key) {
    this.setState({
      pageValue: key
    });
  }

  render() {
    // For allowing using our custom style
    const { classes } = this.props;

    // Dynamically specifies the pageComponent to be used depending on the currently selected page in the BottomNavigation
    const PageComponent = pageComponents[this.state.pageValue];
    const pageFunc = this.fetchPageFunc(this.state.pageValue);

    return (
      <ThemeProvider theme={theme}>
        <Box className={classes.root}>
          <Timer
            initialTime={1000*this.state.taskSchedule[this.state.current].period + 999} // This is in ms as that is what this imported component uses, + 999 in order to shift times in this app by 999 so to complement how we want our timer to jump to next start time instead of turning to 0 (i.e. checkpoint time is 999 not 0)
            direction="backward"
            lastUnit="h" // Only compute time upto hours (not days)
            startImmediately={false} // Defaults to paused
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
    );
  }
}

export default withStyles(useStyles)(Timer_Test);

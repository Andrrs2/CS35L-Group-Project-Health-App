import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ScheduleEntry from './ScheduleEntry.js';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import ListItem from '@material-ui/core/ListItem';
import secondsToHms from './secondsToHms.js';
import hmsToSeconds from './hmsToSeconds.js';
import ExerciseData from "./Exercises.json";
import SearchBar from "./SearchBar";

const useStyles = theme => ({
    schedule: {
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
        flexGrow: 0.75 
    },
    fab: {
        position: "absolute",
        bottom: 80,
        right: 40,
        
    },
    addButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    settingsContainer: {
        position: "absolute",
        bottom: 80,
        left: 40
    }
});

const fabIconDict = {
    "false": <EditIcon></EditIcon>,
    "true": <DoneIcon></DoneIcon>
}

class ScheduleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.taskSchedule.map(entry => ({ name: entry.name, ...secondsToHms(entry.period) })), 
            editing: false, 
            settings: props.data.settings,
        };
        this.updateSchedule = props.func.updateSchedule;
        this.changePage = props.func.changePage;
        this.setEditing = this.setEditing.bind(this);
        this.shiftUpEntry = this.shiftUpEntry.bind(this);
        this.shiftDownEntry = this.shiftDownEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.editEntry = this.editEntry.bind(this);
        this.changeSetting = this.changeSetting.bind(this);
    }

    shiftUpEntry(index) {
        let currentData = this.state.data;
        [currentData[index - 1], currentData[index]] = [currentData[index], currentData[index - 1]];
        this.setState({ data: currentData });
    }

    shiftDownEntry(index) {
        let currentData = this.state.data;
        [currentData[index], currentData[index + 1]] = [currentData[index + 1], currentData[index]];
        this.setState({ data: currentData });
    }

    deleteEntry(index) {
        let currentData = this.state.data;
        currentData.splice(index, 1);
        this.setState({ data: currentData });
    }

    addEntry(index) {
        let currentData = this.state.data;
        currentData.splice(index + 1, 0, { name: "New Exercise", hr: 0, min: 0, sec: 0 }); 
        this.setState({ data: currentData });
    }

    setEditing() {
        const currentEditingState = this.state.editing;
        if (currentEditingState) {
            let newSchedule = this.state.data.map(entry => ({
                name: entry.name,
                period: hmsToSeconds({
                    min: entry.min,
                    sec: entry.sec
                })
            }))
            let newSettings = this.state.settings;
            this.updateSchedule(newSchedule, newSettings);
            this.changePage("timer");
        }
        this.setState({ editing: !currentEditingState });
    }

    editEntry(index, key, value) {
        let currentData = this.state.data;
        currentData[index][key] = value;
        this.setState({ data: currentData });
    }

    changeSetting(e) {
        let currentSettings = this.state.settings;
        currentSettings[e.target.name] = e.target.checked;
        this.setState({ settings: currentSettings });
    }

    render() {
        const { classes } = this.props;
        const entries = this.state.data.map((entry, index, arr) => (
            <ScheduleEntry
                key={index}
                index={index}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                editable={this.state.editing}
                entry={entry}
                upFunc={this.shiftUpEntry}
                downFunc={this.shiftDownEntry}
                delFunc={this.deleteEntry}
                addFunc={this.addEntry}
                editFunc={this.editEntry}
            >
            </ScheduleEntry>
        ));
        return (
            <>
            <div className="search_container">
                <SearchBar data={ExerciseData} />
            </div>
            <div className={classes.schedule}>
                <List>
                    {entries}
                    <ListItem className={classes.addButtonContainer}>
                        <IconButton disabled={!this.state.editing} color="primary" onClick={() => { this.addEntry(this.state.data.length - 1); }}>
                            <AddIcon></AddIcon>
                        </IconButton>
                    </ListItem>
                </List>
                
                <Fab color="primary" className={classes.fab} onClick={this.setEditing}>
                    {fabIconDict[this.state.editing.toString()]}
                </Fab>
            </div>
            </>
        );
    }
}

export default withStyles(useStyles)(ScheduleComponent);

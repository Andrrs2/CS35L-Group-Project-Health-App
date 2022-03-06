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
import secondsToHms from '../scripts/secondsToHms.js';
import hmsToSeconds from '../scripts/hmsToSeconds.js';

const useStyles = theme => ({
    // Scrolls if content overflows and set background color
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
            data: props.data.taskSchedule.map(entry => ({ name: entry.name, ...secondsToHms(entry.period) })), // converts entries to have period split into hr, min, sec attributes
            editing: false, // Defaults, i.e. starts off not editing
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
        currentData.splice(index + 1, 0, { name: "New Exercise", hr: 0, min: 0, sec: 0 }); // Adding the default new task
        this.setState({ data: currentData });
    }

    setEditing() {
        const currentEditingState = this.state.editing;
        // Update corresponding state for schedule data in parent App component given that status before edit button press was in editing, i.e. the press was to confirm the edit
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
            // Changes back to Timer as you've just finished updating the schedule
            this.changePage("timer");
        }
        this.setState({ editing: !currentEditingState });
    }

    // Edits given attribute of entry (of given index) in state.data to specified value
    editEntry(index, key, value) {
        let currentData = this.state.data;
        currentData[index][key] = value;
        this.setState({ data: currentData });
    }

    // Changes setting state in this component only
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
        );
    }
}

export default withStyles(useStyles)(ScheduleComponent);

import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import PeriodInput from './PeriodInput.js';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export default function ScheduleEntry({index, isFirst, isLast, editable, entry, upFunc, downFunc, delFunc, addFunc, editFunc}) {
    return (
        <ListItem divider>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid container item xs={2} sm={2} md={2} lg={2} xl={2} justify="flex-start" alignItems="center">
                    <TextField
                        disabled={!editable}
                        margin="dense"
                        value={entry.name}
                        onChange={(e) => {editFunc(index, "name", e.target.value)}}
                    />
                </Grid>
                <Grid container item xs={6} sm={6} md={6} lg={6} xl={6} justify="center" alignItems="center">
                    <PeriodInput disabled={!editable} min={entry.min} sec={entry.sec} editFunc={editFunc} index={index}></PeriodInput>
                </Grid>
                <Grid container item xs={4} sm={4} md={4} lg={4} xl={4} justify="flex-end" alignItems="center" direction="row">
                    <IconButton item color="primary" disabled={isFirst || !editable} disableElevation onClick={() => {upFunc(index);}}>
                        <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                    </IconButton>
                    <IconButton item color="primary" disabled={isLast || !editable} disableElevation onClick={() => {downFunc(index);}}>
                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </IconButton>
                    <IconButton item color="primary" disabled={!editable} disableElevation onClick={() => {addFunc(index);}}>
                        <AddIcon></AddIcon>
                    </IconButton>
                    <IconButton item color="primary" disabled={!editable} disableElevation onClick={() => {delFunc(index);}}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    );
}
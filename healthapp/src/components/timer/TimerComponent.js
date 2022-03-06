import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";

const useStyles = theme => ({
    timer: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 0.4,
    },
    timerActual: {
        width: "50%",
        flexGrow: 0.6
    },
    timeText: {
        color: "#005a2c",
        userSelect: "none" // so that you cannot highlight the time, did so for personal aesthetics
    },
    timerContainer: {
        width: 300,
        height: 300,
        borderRadius: "75%",
        borderColor: "#005810"
    },
});

class TimerComponent extends React.Component {
    render() {
        const { classes } = this.props;
        const { start, stop, reset, current, next, min, sec } = this.props.data;
        return (
            <Grid container item direction="column" alignItems="center" justifyContent="space-evenly" className={classes.timer}>
                <Box item display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                <Grid container direction="column" alignItems="center">
                    <Typography item variant="h2">{current}</Typography>
                    <Typography item variant="h5">Next: {next}</Typography>
                </Grid>
                    <Button onClick={() => this.props.func(true)} variant="outlined" size="small">Skip</Button>
                </Box>
                <Box item display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                    <Box border={5} className={classes.timerContainer} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Grid container direction="row" justifyContent="center">
                            <Typography item variant="h3" className={classes.timeText}>{min}</Typography>
                            <Typography item variant="h3" className={classes.timeText}>:</Typography>
                            <Typography item variant="h3" className={classes.timeText}>{sec}</Typography>
                        </Grid>
                     </Box>
                </Box>
                <Box item display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <ButtonGroup item color="primary" size="large" variant="contained">
                        <Button onClick={stop}>Stop</Button>
                        <Button onClick={start}>Start</Button>
                        <Button onClick={reset}>Reset</Button>
                    </ButtonGroup>
                </Box>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(TimerComponent);
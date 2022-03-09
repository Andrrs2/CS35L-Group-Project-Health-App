import React, { useRef, useState } from 'react';
import { Form, } from "react-bootstrap";
import { CheckBox, Text, StyleSheet, View} from "react-native";
import Paper from '@mui/material/Paper';
import {ArgumentAxis, ValueAxis, Chart, LineSeries, SplineSeries} from '@devexpress/dx-react-chart-material-ui';
export default class weightTracker extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      weight: 0,
      track: localStorage.getItem('track') === null ? 1 : JSON.parse(localStorage.getItem('track')),
      DataArray: localStorage.getItem('DataArray') === null ? [{argument: 0, value: 0}] : JSON.parse(localStorage.getItem('DataArray')),
    }
  }
  handleSubmit(event) {
    this.setState({track: this.state.track + 1})
    let DataArray = [...this.state.DataArray];
    DataArray[0] = {argument: 0, value: 0}
    DataArray[this.state.track] = {argument: this.state.track, value: this.state.weight};
    this.setState({ DataArray });
    localStorage.setItem('DataArray',  JSON.stringify(DataArray));
    localStorage.setItem('track', JSON.stringify(this.state.track));
    alert('A weight was submitted: ' + this.state.weight);
    event.preventDefault();
  }
  
  render()
  {
    return (
      <View style = {styles.container}>
      <h3>Weight Tracker:</h3>
      <View style = {styles.checkboxContainer}>
        <View style={styles.container}>
        <Form onSubmit= {this.handleSubmit}>
          <Form.Group id="weight">
            <Form.Label>Weight (lb)</Form.Label>
            <Form.Control type="weight" value={this.state.weight}  onChange={e => this.setState({weight: e.target.value})} required />
            <input type="submit" value="Submit" />
          </Form.Group>
        <View style = {styles.checkbox}>
        <form onSubmit={localStorage.clear()}>
         <input type="submit" value="Clear Storage" />
          </form>  
          </View>
        </Form> 
        </View>
        </View>
        <View style={styles.picker}>
        <Paper>
          <Chart
             data = {this.state.DataArray}
          >
            <ArgumentAxis />
            <ValueAxis />
            <LineSeries valueField="value" argumentField="argument" color='BLUE' /> 
            <SplineSeries
            valueField="splineValue"
            argumentField="argument"
          /> 
          </Chart>
        </Paper>
        </View>
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  checkbox: {
    alignSelf: "center",
    marginHorizontal: 20,
  },
  picker: { 
    alignSelf: "center",
    height: 150, 
    width: 500,
  },
});
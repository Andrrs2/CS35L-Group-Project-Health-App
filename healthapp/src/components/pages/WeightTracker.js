import React, { useRef, useState } from 'react';
import { Form, } from "react-bootstrap";
import "../../App.css";
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
      <View style = {styles.checkboxContainer}>
        <View style={styles.container}>
        <Form onSubmit= {this.handleSubmit}>
          <Form.Group id="weight">
            <Form.Label className="label_form">Weight (lb)</Form.Label>
            <Form.Control className="form_box1" type="weight" value={this.state.weight}  onChange={e => this.setState({weight: e.target.value})} required />
            <input className="submit_form" type="submit" value="Submit" />
          </Form.Group>
        <View color="#01793b" style = {styles.checkbox}>
        <form onSubmit={localStorage.clear()}>
         <input className="input_form" type="submit" value="Clear Storage" />
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
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useRef, useState } from 'react';
import { Form, } from "react-bootstrap";
import { CheckBox, Text, StyleSheet, View} from "react-native";
import weightTracker from './WeightTracker';
import Paper from '@mui/material/Paper';
import {ArgumentAxis, ValueAxis, Chart, LineSeries} from '@devexpress/dx-react-chart-material-ui';

export default class Kcal extends React.Component{

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      weight: 0,
      isSelected: false,
      data: 0,
    }
  }
  handleSubmit(event) {
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group id="weight">
            <Form.Label>Weight ({this.state.isSelected ? "kg" : "lb"})</Form.Label>
            <Form.Control type="weight" value={this.state.weight} onChange={e => this.setState({weight: e.target.value })} required />
            <input type="submit" value="Submit" />
          </Form.Group>
        </Form>
        </View>
        </View>
        <View style={styles.picker}>
          <Paper>
          <Chart
           data={[
            { argument: 1, value: 1},
            { argument: 2, value: 30 },
            { argument: 3, value: 20 },
          ]}
          >
          <ArgumentAxis />
          <ValueAxis />
           <LineSeries valueField="value" argumentField="argument" />
             </Chart>
               </Paper>
               </View>
        </View>
      )
    }
};
function createChart(x, y)
{
<Paper>
  <Chart
    data={[
      { argument: x, value: y},
      { argument: 2, value: 30 },
      { argument: 3, value: 20 },
    ]}
    >
    <ArgumentAxis />
    <ValueAxis />
   <LineSeries valueField="value" argumentField="argument" />  
  </Chart>
</Paper>
}
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
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
    this.state = {
      weight: 0,
      isSelected: false,
    };
  }

  render()
  {
    return (
      <View style = {styles.container}>
      <h3>Weight Tracker:</h3>
        <View style = {styles.checkboxContainer}>
          <CheckBox style = {styles.checkbox}
            value = {this.state.isSelected}
            onValueChange={() => this.setState({isSelected: !this.state.isSelected})}
          />
          <Text>
            Metric System
          </Text>
        <View style={styles.container}>
        <Form>
          <Form.Group id="weight">
            <Form.Label>Weight ({this.state.isSelected ? "kg" : "lb"})</Form.Label>
            <Form.Control type="weight" value={this.state.weight} onChange={e => this.setState({weight: e.target.value })} required />
          </Form.Group> 
        </Form>
        </View>
        </View>
        <View style={styles.picker}>
          <Paper>
          <Chart
           data={[
            { argument: 1, value: 10 },
            { argument: 2, value: 20 },
            { argument: 3, value: 30 },
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
    bottom: 0
  },
});
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useRef, useState } from 'react';
import { Form, } from "react-bootstrap";
import { CheckBox, Text, StyleSheet, View} from "react-native";
import weightTracker from './WeightTracker';

export default class Kcal extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      weight: 0,
      gender: "male",
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
          
        </View>
        <View style={styles.container}>
        <Form>
          <Form.Group id="weight">
            <Form.Label>Weight ({this.state.isSelected ? "kg" : "lb"})</Form.Label>
            <Form.Control type="weight" value={this.state.weight} onChange={e => this.setState({weight: e.target.value })} required />
          </Form.Group> 
        </Form>
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
});
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { Form, Card, Alert } from "react-bootstrap";
import { CheckBox, Text, StyleSheet, View, Picker, Button } from "react-native";
import weightTracker from './WeightTracker';

export default class Kcal extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      weight: 0,
      height: 0,
      age: 0,
      BMI: 0,
      BMR: 0,
      gender: "male",
      isSelected: false,
      message: "",
      intakeMessage: "",
    };
  }

  getMessage()
  {
    const bmi = this.state.BMI.slice()
    console.log(bmi)
    
    if (bmi >= 30)
    {
      this.setState({message: "Obese: Recommend to lower calorie intake and increase activity"})
    }
    else if (bmi >= 25)
    {
      this.setState({message: "Overweight: Recommend to lower calorie intake or increase activity"})
    }
    else if (bmi >= 18.5)
    {
      this.setState({message: "Standard weight: Recommend to continue current intake and activity level"})
    }
    else if (bmi <= 18.5)
    {
      this.setState({message: "Underweight: Recommend to increase calorie intake"})
    }
  }

  getBMR()
  {
    if (this.state.weight != undefined && this.state.height != undefined && this.state.isSelected != undefined)
    {
      var weight = this.state.weight
      var height = this.state.height
      const age = this.state.age
      const gender = this.state.gender
      var bmr;

      if (!this.state.isSelected)
      {
        weight = weight*0.453592 //lb to kg
        height = height*0.0254 //in to m
      }

      if (gender == "male")
      {
        bmr = 10*weight + 625*height - 5*age + 5
      }
      else if (gender == "female")
      {
        bmr = 10*weight + 625*height - 5*age - 161
      }

      this.setState({BMR: bmr.toFixed(3)})
    }
  }

  getBMI()
  {
    if (this.state.weight != undefined && this.state.height != undefined && this.state.isSelected != undefined)
    {
      var weight = this.state.weight
      var height = this.state.height
      const isSelected = this.state.isSelected
      var bmi;

      

      if (isSelected)
      {
        bmi = weight / (height*height)
      }
      else
      {
        bmi = weight / (height*height) * 703
      }

      this.setState({BMI: bmi.toFixed(3)})
    }
  }

    render()
    {
      return (
        <View style = {styles.container}>
        <h3>Calorie Counter:</h3>

        <div>
          <img src="https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://cf-images.us-east-1.prod.boltdns.net/v1/static/5978871887001/a0dce445-a4cd-4a75-84bd-214f89ee723f/ec7257d3-53b9-4b77-aacd-435da2bff73b/1280x720/match/image.jpg&w=1280&h=720&q=90&c=cc" alt = "calorie" width={384} height={216}/>
        </div>

        <View style = {styles.checkboxContainer}>
          <CheckBox style = {styles.checkbox}
            value = {this.state.isSelected}
            onValueChange={() => this.setState({isSelected: !this.state.isSelected})}
          />
          <Text>
            Metric System
          </Text>
          
        </View>
        <View style = {styles.checkboxContainer}>
          <Picker style={styles.picker}
            selectedValue={this.state.gender}
            onValueChange={() => this.state.gender == "male" ? this.setState({gender: "female"}) : this.setState({gender: "male"})}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.container}>
        <Form>
          <Form.Group id="weight">
            <Form.Label>Weight ({this.state.isSelected ? "kg" : "lb"})</Form.Label>
            <Form.Control type="weight" value={this.state.weight} onChange={e => this.setState({weight: e.target.value })} required />
          </Form.Group>
          <Form.Group id="height">
            <Form.Label>Height ({this.state.isSelected ? "m" : "in"})</Form.Label>
            <Form.Control type="height" value={this.state.height} onChange={e => this.setState({height: e.target.value })}required />
          </Form.Group>
          <Form.Group id="age">
            <Form.Label>Age (Yrs)</Form.Label>
            <Form.Control type="age" value={this.state.age} onChange={e => this.setState({age: e.target.value })}required />
          </Form.Group>
          <Button onPress={this.getBMI.bind(this)} title="Calculate BMI">
          </Button>
          <Button onPress={this.getBMR.bind(this)} title="Calculate BMR">
          </Button>
        </Form>

        <Text style = {styles.label}>
          BMI: {this.state.BMI} {'\n'}
          BMR: {this.state.BMR} {'\n'}
          Recommended Daily Calorie Intake: {this.state.BMR} Kcal / Day
        </Text>
        </View>
        <Form>
          <Form.Group id="bmi">
          <Form.Label>Enter BMI Here:</Form.Label>
            <Form.Control type="bmi" value={this.state.BMI} onChange={e => this.setState({BMI: e.target.value })} required />
          </Form.Group>
          <Button onPress={this.getMessage.bind(this)} title="Get Recommendation">
          </Button>
        </Form>
        <View style={styles.container}>
          <Text style={styles.label}>
            BMI: {this.state.BMI} {'\n'}
            {this.state.message}
          </Text>
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
    marginHorizontal: 20,
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
  label: {
    margin: 8,
    marginHorizontal: 10,
    letterSpacing: 2,
    alignItems: "center",
  },
  picker: {
    height: 50, 
    width: 150,
  },

  forms: {
    flexDirection: "row",
    marginBottom: 20,
  }
});
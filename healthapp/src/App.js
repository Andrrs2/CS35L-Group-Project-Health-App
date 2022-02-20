import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import logo from './Healthlogo.png';
import './App.css';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> 
          CS35L Group Project - Health App
        </p>
        <Text style = {style.defText}>
          This interactable app is designed to receive and display health information of a client
        </Text>
        <Button title='Start'/>
      </header>
      
    </div>
  );
}

const style = StyleSheet.create
({
  defText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgb(255,255,255)',
    marginVertical: 18,
  },
});

export default App;
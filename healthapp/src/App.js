import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import logo from './Healthlogo.png';
import './App.css';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/menubar"
import Home from './pages/home'
import kcal from "./pages/Kcal"
import exerciseTimer from "./pages/exerciseTimer"
import sleepScheduler from "./pages/sleepScheduler"
import weightTracker from "./pages/WeightTracker"

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/Kcal' exact component={kcal} />
      <Route path='/exerciseTimer' component={exerciseTimer} />
      <Route path='/sleepScheduler' component={sleepScheduler} />
      <Route path='/WeightTracker' component={weightTracker} />
    </Switch>
  </Router>
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
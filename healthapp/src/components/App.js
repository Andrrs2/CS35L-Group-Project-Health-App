import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
//import logo from './Healthlogo.png';
import '../App.css';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./menubar"
import Home from '../pages/home'
import kcal from "../pages/Kcal"
import exerciseTimer from "../pages/exerciseTimer"
import sleepScheduler from "../pages/sleepScheduler"
import weightTracker from "../pages/WeightTracker"


import Signup from "./SignUp"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./context"
//import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (
      <Router>
      <Navbar />
      <AuthProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Kcal' exact component={kcal} />
          <Route path='/exerciseTimer' component={exerciseTimer} />
          <Route path='/sleepScheduler' component={sleepScheduler} />
          <Route path='/WeightTracker' component={weightTracker} />
          <Route path='/update-profile' component={UpdateProfile} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
        </Switch>
        </AuthProvider>
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
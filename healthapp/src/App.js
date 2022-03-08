import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CalorieCounter from './components/pages/Kcal';
import WeightTracker from './components/pages/WeightTracker';
import SleepTracker from './components/pages/SleepTracker';
import Timer_Test from './components/pages/Timer_Test';

import Signup from "./components/user_auth/SignUp"
import { AuthProvider } from "./components/user_auth/context"
import Login from "./components/user_auth/Login"
import PrivateRoute from "./components/user_auth/PrivateRoute"
import ForgotPassword from "./components/user_auth/ForgotPassword"
import UpdateProfile from "./components/user_auth/UpdateProfile"
import Logout from "./components/user_auth/LogOut"

function App() {
  return (
    <>
      <Router>
      <Navbar />
      <AuthProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/calorie_counter' exact component={CalorieCounter} />
          <PrivateRoute path='/timer_exercise' component={Timer_Test} />
          <PrivateRoute path='/sleep_tracker' component={SleepTracker} />
          <PrivateRoute path='/weight_tracker' component={WeightTracker} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />
          <PrivateRoute path='/logout' component={Logout} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

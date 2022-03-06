import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalorieCounter from './components/pages/Kcal';
import WeightTracker from './components/pages/WeightTracker';
import SleepTracker from './components/pages/SleepTracker';
import Timer from './components/pages/Timer_Test';

import SignUp from "./components/user_auth/SignUp"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./components/user_auth/context"
import Login from "./components/user_auth/Login"
import PrivateRoute from "./components/user_auth/PrivateRoute"
import ForgotPassword from "./components/user_auth/ForgotPassword"
import UpdateProfile from "./components/user_auth/UpdateProfile"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route path="/timer_exercise" element={<Timer/>}/>
            <Route path="/sleep_tracker" element={<SleepTracker/>}/>
            <Route path="/calorie_counter" element={<CalorieCounter/>}/>
            <Route path="/weight_tracker" element={<WeightTracker/>}/>
            <Route path='/update-profile' component={UpdateProfile} />
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

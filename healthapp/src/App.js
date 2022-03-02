import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import CalorieCounter from './components/pages/CalorieCounter';
import ExerciseTimer from './components/pages/ExerciseTimer';
import WeightTracker from './components/pages/WeightTracker';
import SleepTracker from './components/pages/SleepTracker';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sleep_tracker" element={<SleepTracker/>}/>
          <Route path="/calorie_counter" element={<CalorieCounter/>}/>
          <Route path="/exercise_timer" element={<ExerciseTimer/>}/>
          <Route path="/weight_tracker" element={<WeightTracker/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

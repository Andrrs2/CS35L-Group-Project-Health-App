import React from 'react';
import { Navigate } from 'react-router-dom';
import {useState} from "react";
import '../../App.css';
import ExerciseList from '../exercise_timer/ExerciseList';
import { Link } from 'react-router-dom';


var finished = false

const handleStart = () => {
    finished = true
    console.log(finished)
  };

export default function ExerciseTimer() {
    const closeMobileMenu = () => setClick(false);
    const [click, setClick] = useState(false);
  return (
    <>
      {/* <Simple /> */}
      <ExerciseList />
      <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
              <center><button className='centerized'> Start Workout </button></center>
    </>
  );
}

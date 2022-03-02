import React from 'react';
import { Navigate } from 'react-router-dom';
import {useState} from "react";
import '../../App.css';
import Simple from '../exercise_timer/Simple.js'
import TodoList from '../todo/TodoList';
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
      <TodoList />
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

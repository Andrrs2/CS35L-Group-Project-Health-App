import React from 'react';
import {useState} from "react";
import '../../App.css';
import ExerciseList from '../exercise_timer/ExerciseList';


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
      
    </>
  );
}

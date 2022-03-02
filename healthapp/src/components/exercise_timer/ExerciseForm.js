import React, { useState, useEffect, useRef } from 'react';

function ExerciseForm(props) {
  const [input, setInput] = useState('');
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState("");
  const [exercise_time, setExerciseTime] = useState("");
  const [etimes, setExerciseTimes] = useState([]);
  const [recovery_time, setRecoveryTime] = useState("");
  const [rtimes, setRecoveryTimes] = useState([]);
  const [round, setRound] = useState([]);
  const [rounds, setRounds] = useState("");

  const inputRef = useRef(null);
  const exerciseRef = useRef(null);
  const eTimeRef = useRef(null);
  const rTimeRef = useRef(null);
  const roundRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {setInput(e.target.value);};

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      ex_time: exercise_time,
      rec_time: recovery_time,
    });
    setInput('');

    const newExercise = { id: new Date().getTime(), text: exercise }
    const newExerciseTime = {id: new Date().getTime(), text: exercise_time}
    const newRecoveryTime = { id: new Date().getTime(), text: recovery_time,}
    const newRound = { id: new Date().getTime(), text: round,}
    
    setExercises([...exercises].concat(newExercise)); setExercise("")
    setExerciseTimes([...etimes].concat(newExerciseTime)); setExerciseTime("")
    setRecoveryTimes([...rtimes].concat(newRecoveryTime)); setRecoveryTime("")
    setRounds([...rounds].concat(newRound)); setRound("")
  };

  return (
    <div className='timer'>
    <form onSubmit={handleSubmit} className='exercise-form'>
      {(
        <>
          <input
            placeholder='Exercise Name'
            value={input}
            onChange={handleChange}
            name='text'
            className='exercise-input'
            ref={inputRef}
          />
        </>   
      )}

      <label>Exercise Time (in s):</label>
        <select
          value={exercise_time}
          ref={exerciseRef}
          onChange={(e) => setExerciseTime(e.target.value)}
        >
          <option value="0">-</option>  
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="60">60</option>
          
        </select>
    
        <label>Recovery Time (in s):</label>
        <select
          value={recovery_time}
          onChange={(e) => setRecoveryTime(e.target.value)}
        >
          <option value="0">-</option>    
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="60">60</option>
        </select>

        <label>Round Number:</label>
        <select
          value={round}
          onChange={(e) => setRound(e.target.value)}
        >
          <option value="round_0">-</option>  
          <option value="round_1">Round 1</option>
          <option value="round_2">Round 2</option>
          <option value="round_3">Round 3</option>
          <option value="round_4">Round 4</option>
          <option value="round_5">Round 5</option>
        </select>

        <button onClick={handleSubmit} className='exercise-button'>
            Add Exercise
          </button>
    </form>
    </div>
  );
}

export default ExerciseForm;

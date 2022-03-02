import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const Exercise = ({ exercises, completeExercise, removeExercise, etimes}) => {

  return exercises.map((exercise, index) => (
    <div
      className={exercise.isComplete ? 'exercise-row complete' : 'exercise-row'}
      key={index}
    >
      <div key={exercise.id} onClick={() => completeExercise(exercise.id)}>
        <div className='exerciseName'>{exercise.text}</div> 
        Exercise Time: {exercise.ex_time}s Recovery Time: {exercise.rec_time}s
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeExercise(exercise.id)}
          className='delete-icon'
        />
      </div>
    </div>
  ));
};

export default Exercise;

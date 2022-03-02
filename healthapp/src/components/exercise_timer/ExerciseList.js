import React, { useState } from 'react';
import ExerciseForm from './ExerciseForm';
import Exercise from './Exercise';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  const addExercise = exercise => {
    if (!exercise.text || /^\s*$/.test(exercise.text)) {
      return;
    }

    const newExercises = [exercise, ...exercises];

    setExercises(newExercises);
    console.log(exercise);
  };

  const updateExercise = (exerciseId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setExercises(prev => prev.map(item => (item.id === exerciseId ? newValue : item)));
  };

  const removeExercise = id => {
    const removedArr = [...exercises].filter(exercise => exercise.id !== id);

    setExercises(removedArr);
  };

  const completeExercise = id => {
    let updatedExercises = exercises.map(exercise => {
      if (exercise.id === id) {
        exercise.isComplete = !exercise.isComplete;
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <>
      <h1>Exercise Timer</h1>
      <ExerciseForm onSubmit={addExercise} />
      <Exercise
        exercises={exercises}
        completeExercise={completeExercise}
        removeExercise={removeExercise}
        updateExercise={updateExercise}
      />
    </>
  );
}

export default ExerciseList;

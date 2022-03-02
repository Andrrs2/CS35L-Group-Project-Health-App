import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/veggies.jpg'
              text='Food for your thoughts'
              label='Fitness'
              path='/calorie_counter'
            />
            <CardItem
              src='images/high_five.jpg'
              text='10 Minute Exercises'
              label='Workout'
              path='/calorie_counter'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/lift_2.jpg'
              text='10 Things to do when you can not sleep'
              label='Sleep'
              path='/calorie_counter'
            />
            <CardItem
              src='images/veggies2.jpg'
              text='Why salads would not make you thin'
              label='Fitness'
              path='/calorie_counter'
            />
            <CardItem
              src='images/sleep.jpg'
              text='Glutes Workout for You'
              label='Workout'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;

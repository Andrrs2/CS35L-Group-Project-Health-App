import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import backgroundVideo from '../videos/health_app_video.mp4'
function HeroSection() {
  return (
    <div className='hero-container'>
      <video autoPlay loop muted id='video'>
        <source src={backgroundVideo} type='video/mp4'/>
      </video>
      <h1>HLTH
      <i class='fa-solid fa-heart-pulse' />
      </h1>
      <p>your #1 fitness pal</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          SIGN IN
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

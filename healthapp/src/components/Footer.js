import React from 'react';

import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <center>
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          CS 35L Web Application Project
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Tamjid Khan</h2>
          </div>
          <div class='footer-link-items'>
            <h2>Andres Blanco</h2>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Eric Moran</h2>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Jillian Pantig</h2>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Shiyan Fu</h2>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              HLTH
              <i class='fa-solid fa-heart-pulse' />
            </Link>
          </div>
          <small class='website-rights'>HLTH © 2022</small>
        </div>
      </section> 
    </div>
    </center>
  );
}

export default Footer;

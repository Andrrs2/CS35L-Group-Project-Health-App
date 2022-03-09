import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HLTH
            <i class='fa-solid fa-heart-pulse' />
          </Link>  
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/timer_exercise'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Exercise Timer
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/calorie_counter'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Calorie Counter
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/weight_tracker'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Weight Tracker
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/sleep_tracker'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sleep Tracker
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/signin'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/signout'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

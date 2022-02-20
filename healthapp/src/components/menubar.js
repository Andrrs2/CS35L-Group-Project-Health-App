import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './MenuElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/Kcal' activeStyle>
            Calorie Counter
          </NavLink>
          <NavLink to='/exerciseTimer' activeStyle>
            Exercise Timer
          </NavLink>
          <NavLink to='/sleepScheduler' activeStyle>
            Sleep Scheduler
          </NavLink>
          <NavLink to='/WeightTracker' activeStyle>
            Weight Tracker
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;

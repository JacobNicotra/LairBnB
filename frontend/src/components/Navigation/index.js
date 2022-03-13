// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import dragon from '../../images/dragon.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className="btn nav-btn" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-button-list" >

      <li>
       <NavLink  className="btn nav-btn" exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>

      <li id="LairBnB"> <img id="dragon" src={ dragon } alt="dragon"/> LairBnB </li>

      <li>
        <NavLink className="btn nav-btn" exact to="/spots">View Lairs</NavLink>
    
        <NavLink className="btn nav-btn" exact to="/spots/new">List a Lair</NavLink>
      </li>


    </ul>
  );
}

export default Navigation;

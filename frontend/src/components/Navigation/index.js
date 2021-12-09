// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

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
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-button-list" >
      <div>
        <li>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>

      </div>
      <div>
        <li>
          <NavLink exact to="/spots">Spots</NavLink>
        </li>

      </div>
      <div>
        <li>
          <NavLink exact to="/spots/new">List Your Spot</NavLink>
        </li>

      </div>
    </ul>
  );
}

export default Navigation;
//   <li key={spot.id}> <NavLink to={`/spot/${spot.id}`} >

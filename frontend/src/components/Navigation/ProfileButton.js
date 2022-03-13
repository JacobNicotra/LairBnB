// Follow the instructions here for setting up Font Awesome. The easiest way to connect Font Awesome to your React application is by sharing your email and creating a new kit. The kit should let you copy an HTML <script>. Add this script to the <head> of your frontend/public/index.html file.

// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    document.getElementById("LairBnB").classList.add('display-none');

  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile-container">
      <button className="btn profile-btn" onClick={openMenu}>
        <div id="profile"><i className="fas fa-user-alt"></i></div>

      </button>
      {showMenu && (
        <div className="profile-dropdown" id="prof-drop">
          <div id="profile-info">

            <div className="pro-inf">{user.username}</div>
            <div className="pro-inf">{user.email}</div>

          </div>

          <div>
            <button className="small-btn small-red-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </ div>
  );
}

export default ProfileButton;

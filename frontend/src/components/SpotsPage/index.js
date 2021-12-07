// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from '../../store/spot'

function SpotBrowser() {
  const dispatch = useDispatch();
  const spots = useSelector(state => {
    // console.log('state', Object.values(state.spot))
    // console.log('state', state.spot.list.map)
    console.log('state.spot', state.spot)
    return Object.values(state.spot);
  });
  // console.log('SOPTS', spots)
  // const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);


  if (!spots) {
    console.log('!no spots')
    return null;
  }

  return (
    <main>
      <h1>some spots here</h1>
      <ul>
        {spots.map((spot) => {
          return (
            <li key={spot.id}> <div>
              <div>{spot.title}</div>
              <div>{spot.description}</div>
              <div>pictures</div>
            </div>  </ li>
          );
        })}
      </ul>
    </main>
  );
}

export default SpotBrowser;

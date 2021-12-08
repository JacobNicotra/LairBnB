// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from '../../store/spot'
import { NavLink, Route, useParams } from 'react-router-dom';
import SpotDetailer from '../SpotDetails'

function SpotBrowser() {
  const dispatch = useDispatch();
  const spots = useSelector(state => {
    console.log("STATE BROWSER", state)
    return Object.values(state.spot);
  });
  // const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);


  if (!spots) {
    console.log('!no spots')
    return null;
  }
console.log('spots',spots)
  return (
    <main>
      <h1>some spots here</h1>
      <ul>
        {spots.map((spot) => {
          if (spot.id) {
            console.log('object spot', spot)
            
            return (
              <li key={spot.id}> <NavLink to={`/spot/${spot.id}`} >
                <div>{spot.title}</div>
                <div>{spot.description}</div>
                {/* <div>{spot.pictures && spot.pictures}</div> */}
                {/* <div>{spot.pictures && <img src={spot.pictures[0].picture} alt="listing" />}</div> */}
                <div><ul>
                  {
                    (spot.pictures && spot.pictures.map((picture) => {
                      // console.log(picture)
                      if (picture.id == spot.pictures[0].id) {
                        return (
                          <li key={+picture.id}> <img src={picture.picture} alt="listing" /></li >
                        )
  
                      }
                    }))
                  }
                </ul></div>
              </NavLink>  </ li>
            );
          } // implement CRUD need C, u and d
        })}
      </ul>
      {/* <Route path="/spot/:spotId">
          <SpotDetailer />
        </Route> */}
    </main>
  );
}

export default SpotBrowser;

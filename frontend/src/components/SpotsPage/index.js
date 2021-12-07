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
    // console.log('state.spot', state.spot)
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

  // console.log('000000', spots[0].pictures[1])//.pictures.picture)
  return (
    <main>
      <h1>some spots here</h1>
      <ul>
        {spots.map((spot) => {
          return (
            <li key={spot.id}> <div>
              <div>{spot.title}</div>
              <div>{spot.description}</div>
              {/* <div>{spot.pictures && spot.pictures}</div> */}
              {/* <div>{spot.pictures && <img src={spot.pictures[0].picture} alt="listing" />}</div> */}
              <div><ul>
                {
                  (spot.pictures && spot.pictures.map((picture) => {
                    console.log(picture)
                    if (picture.id == spot.pictures[0].id) {
                      return (
                        <li key={picture.id}> <img src={picture.picture} alt="listing" /></li >
                      )

                    }
                  }))
                }
              </ul></div>
            </div>  </ li>
          );
        })}
      </ul>
    </main>
  );
}

export default SpotBrowser;

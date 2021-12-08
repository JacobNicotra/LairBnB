import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from '../../store/spot'

function SpotDetailer() {
  const dispatch = useDispatch();
  const { spotId } = useParams()
  

  const spots = useSelector(state => {
    console.log("STATE DETAILS", state)
    return state.spot;
  });

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  
  const spot = spots[spotId]
  console.log('spots ', spots)
  console.log('id: ', spotId, spot)// spot.title)
  console.log("TITLE", spot?.title)
  
  if (!spot) {
    console.log('!no spots')
    return null;
  }
  return (
    <main>
      <h1>{spot.title}</h1>
      <div><ul>{
        (spot.pictures && spot.pictures.map((picture) => {
          return (
            <li key={picture.id}> <img src={picture.picture} alt="listing" /></li >
          )
        }))
      }</ul></div>
      <div>{spot.description}</div>
      <div>pictues and thins</div>
    </main>
  )

}

export default SpotDetailer
  ;

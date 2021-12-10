import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import { getSpots, deleteSpot } from '../../store/spot'
import EditFormModal from '../EditFormModal'

import './SpotDetails.css';


function SpotDetailer() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams()

  const [owner, setOwner] = useState(false)

  let stater;
  const spots = useSelector(state => {
    stater = state

    return state.spot;
  });

  const spot = spots[spotId]


  const userId = useSelector(state => {
    return state?.session?.user?.id

  });

  useEffect(() => {


    dispatch(getSpots());

  }, [dispatch]);

  useEffect(() => {


    if (userId && userId === spot?.userId) {
      return setOwner(true)
    } else setOwner(false)
  }, [dispatch, userId, stater.spot, spot?.userId]);


 


  const handleDelete = (e) => {
    const deletedSpot = dispatch(deleteSpot(spotId))
    if (deletedSpot) {
      history.push(`/spots`);
    }
    // }

  }



  if (!spot) {
    return null;
  }

  return (
    <main>
      <h1 className="title-SpotDetails" >{spot.title}</h1>
      <div className="spot-info-SpotDetails" ><ul className="pics-SpotDetails">{
        (spot.pictures && spot.pictures.map((picture) => {
          return (
            <div key={picture.id} className="container-pic-SpotDetails" >

              <li className="pic-SpotDetails" > <img className="img-SpotDetails" src={picture.picture} alt="listing" /></li >
            </div>
          )
        }))
      }</ul></div>
      <div className="desc-SpotDetails" >{spot.description}</div>
      <div className="user-SpotDetails" >Hosted By: {spot.User.username}</div>
      {/* <div>pictues and thins</div> */}
      <div>{(owner && <span>
        <button className="small-red-btn small-btn" onClick={handleDelete}>Delete</button>
          <div>
        <EditFormModal />
        </div>
      </span>
      )}  </div>

    </main>
  )

}

export default SpotDetailer
  ;

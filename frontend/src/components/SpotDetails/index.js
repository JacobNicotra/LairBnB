import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import { getSpots, deleteSpot } from '../../store/spot'
import { createBooking } from '../../store/booking'
import EditFormModal from '../EditFormModal'
import TableDatePicker from '../DatePicker'

import coin from '../../images/coin.png'


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
  }, [userId, stater.spot, spot?.userId]);


  const handleDelete = async (e) => {
    const deletedSpot = await dispatch(deleteSpot(spotId))

    if (deletedSpot) {
      return history.push(`/spots`);
    }


  }

console.log('ownersdfasfsadf', owner)

  if (!spot) {
    return null;
  }

  return (
    <main>
      <h1 className="title-SpotDetails" >{spot.title}</h1>

      <div className="spot-info-SpotDetails" >
        <span className="price-SpotDetails">
          <img className="coin coin-details" src={coin} alt="gold dragons" width="25" height="25" />
          <div>{spot.price} / night</div>
        </span>
        <ul className="pics-SpotDetails">{
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
        <div className="edit-delete">
          <EditFormModal />
          <button className="small-red-btn small-btn" onClick={handleDelete}>Delete</button>
        </div>
      </span>
      )}  </div>
      <div>{(<span>

        <TableDatePicker spotId={spotId} userId={userId} spot={spot} owner={owner} />

      </span>
      )}  </div>

    </main>
  )

}

export default SpotDetailer
  ;

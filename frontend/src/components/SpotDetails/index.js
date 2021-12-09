import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { getSpots, deleteSpot } from '../../store/spot'

import EditFormModal from '../EditFormModal'

function SpotDetailer() {

  // NEED TO TRIGGER RERENDER OF THIS COMPONENT WHEN after log out
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams()

  const [owner, setOwner] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  let stater;
  const spots = useSelector(state => {
    stater = state
    // console.log("----------------SELECTOR state", state?.spot)
    // console.log("---------------- state.spot", state.spot)

    return state.spot;
  });
  // console.log("----------------OUTsIDE state", stater?.spot)

  const spot = spots[spotId]
  // console.log('OUTSIDE spots', spots)


  const userId = useSelector(state => {
    // console.log("STATE USER", state.session.user)
    return state?.session?.user?.id

  });

  useEffect(() => {
    // console.log("-----------------UseEffect state", stater?.spot)


    // console.log('userId', userId)
    // console.log('INSIDE spots', spots)

    dispatch(getSpots());
    // if (userId && userId === spot?.userId) {
    //   // console.log('logged in !!!!!!!')
    //   return setOwner(true)
    // } //else setOwner(false)
  }, [dispatch]);

  useEffect(() => {
    // console.log("-----------------UseEffect state", stater?.spot)


    // console.log('userId', userId)
    // console.log('INSIDE spots', spots)

    if (userId && userId === spot?.userId) {
      // console.log('logged in !!!!!!!')
      return setOwner(true)
    } else setOwner(false)
  }, [dispatch, userId, stater.spot]);


  // console.log('spots ', spots)
  // console.log('id: ', spotId, spot)// spot.title)
  // console.log("TITLE", spot?.title)


  const handleDelete = (e) => {
    // if (userId === )
    // console.log('userId ', typeof userId, 'spotId', typeof +spotId)

    // if (userId === +spotId) {
    const deletedSpot = dispatch(deleteSpot(spotId))
    if (deleteSpot) {
      history.push(`/spots`);
    }
    // }

  }

//   const handleEdit = (e) => {
// return setShowEditForm(true)
//   }


  if (!spot) {
    // console.log('!no spots')
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
      <div>{(owner && <span>
        <button onClick={handleDelete}>Delete</button>
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

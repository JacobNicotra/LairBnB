// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from '../../store/spot'
import { NavLink, Route, useParams } from 'react-router-dom';
import coin from '../../images/coin.png'

function SpotBrowser() {
  const dispatch = useDispatch();
  const spots = useSelector(state => {
    // console.log("STATE BROWSER", state)
    return Object.values(state.spot);
  });
  // const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);


  if (!spots) {
    // console.log('!no spots')
    return null;
  }
// console.log('spots',spots)
  return (
    <main id="spots-page" className="spots-page-main">
      <ul>
        {spots.map((spot) => {
          if (spot.id) {
            // console.log('object spot', spot)
            
            return (
              <li className="spot-tile tile-1" key={spot.id}> <NavLink to={`/spot/${spot.id}`} >
                <div className="spot-title-SpotsPage tile-2">{spot.title}</div>
                {/* <div>{spot.description}</div> */}
                {/* <div>{spot.pictures && spot.pictures}</div> */}
                {/* <div>{spot.pictures && <img src={spot.pictures[0].picture} alt="listing" />}</div> */}
                <div className="tile-2"><ul className="tile-3">
                  {
                    (spot.pictures && spot.pictures.map((picture) => {
                      // console.log(picture)
                      if (picture.id == spot.pictures[0].id) {
                        return (
                          <li className="spot-tile-li tile-4" key={+picture.id}> <img className="spot-tile-pic tile-5" src={picture.picture} alt="listing" /></li >
                        )
  
                      }
                    }))
                  }
                </ul></div>
                <div className="price-SpotPage tile-2" >
                  <span className="price-SpotPage">
                    <img className="coin" src={coin} alt="gold dragons"  width="25" height="25"/>
                    <div>{ spot.price } / night</div>
                  </span>
                </div>
              </NavLink>  </ li>
            );
          } // implement CRUD need C, u and d
        })}
      </ul>
     
    </main>
  );
}

export default SpotBrowser;
// /Users/jacobnicotra/Desktop/myAppAcademy/groupProjects/LairBnB/authenticate-me/frontend/src/components/SpotsPage/images/gold.png
// frontend/src/components/SpotsPage/images/gold.png

// import something from './images/'

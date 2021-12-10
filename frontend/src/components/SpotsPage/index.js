import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from '../../store/spot'
import { NavLink } from 'react-router-dom';
import coin from '../../images/coin.png'

function SpotBrowser() {
  const dispatch = useDispatch();
  const spots = useSelector(state => {
    return Object.values(state.spot);
  });

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);


  if (!spots) {
    return null;
  }
  return (
    <main id="spots-page" className="spots-page-main">
      <ul>
        {spots.map((spot) => {
          if (spot.id) {
            
            return (
              <li className="spot-tile tile-1" key={spot.id}> <NavLink to={`/spot/${spot.id}`} >
                <div className="spot-title-SpotsPage tile-2">{spot.title}</div>
               
                <div className="tile-2"><ul className="tile-3">
                  {
                    (spot.pictures && spot.pictures.map((picture) => {
                      if (picture.id === spot.pictures[0].id) {
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
          } else return
        })}
      </ul>
     
    </main>
  );
}

export default SpotBrowser;

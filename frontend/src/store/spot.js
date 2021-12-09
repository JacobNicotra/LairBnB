// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD';
const ADD_ONE = 'spots/ADD_ONE';
const DELETE_ONE = 'spots/DELETE_ONE';

const load = (list) => ({
  type: LOAD,
  list
});


const addOneSpot = (spot) => ({
  type: ADD_ONE,
  spot
});

const removeSpot = (spot) => ({
  type: DELETE_ONE,
  spot
});

export const createSpot = (data) => async (dispatch) => {
  // console.log(' ---------------------------------- data', data);

  const response = await csrfFetch("/api/spots", {
    method: 'POST',
    body: JSON.stringify(data)
  });

  // console.log( ' ---------------------------------- res', response);
  if (response.ok) {
    // console.log('res is ok')
    const spot = await response.json();
    // console.log(' ---------------------------------- store', spot)
    // console.log('state', state)
    dispatch(addOneSpot(spot));
    return spot;
  }
};

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const list = await response.json();

    // console.log('list',list)
    dispatch(load(list));
  }
};

export const deleteSpot = spotId => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'

  });
  if (res.ok) {
    const spot = await res.json()
    // console.log('thunk spot', spot)
    dispatch(removeSpot(spot))
  }
}

export const updateSpot = (data, spotId) => async (dispatch) => {
  // console.log('store data', data, 'id', spotId)
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'put',
    body: JSON.stringify(data)
  });

  // console.log('* * * * * * * back from space')
  if (response.ok) {
    const spot = await response.json();
    // console.log('spot from store', spot)
    dispatch(addOneSpot(spot));
    return spot;
  }
};

const initialState = {
  list: [],
  types: []
};

const sortList = (list) => {
  return list
    .sort((A, B) => {
      return A.id - B.id;
    })
    .map((spot) => spot.id);
};

const spotReducer = (state = initialState, action) => {
  // console.log('----------------------------------', action.type)
  switch (action.type) {
    case LOAD: {
      // console.log(' ----------------------------------  action  ---------------------------------- ', action)
      const allSpots = {};
      action.list.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      const newState = {
        ...allSpots,
        ...state,
        list: sortList(action.list)
      }
      // return {
      //   ...state,
      //   ...allSpots
      //   // ...allSpots,
      //   // ...state,
      //   // list: action.list
      // };
      return newState
    }
    case ADD_ONE: {
      if (!state[action?.spot?.id]) {
        // console.log(' ---------------------------------------------------------- ACTION IN REDUCER', action)
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        };
        const spotList = newState.list.map((id) => newState[id]);
        spotList.push(action.spot);
        newState.list = spotList;
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot
        }
      };
    }
    case DELETE_ONE: {
      const newState = { ...state }
      // console.log(' ----------------------------------------------------------reducer action', action)
      // console.log('reducer action.spot', action.spot)
      // console.log('reducer action.spot.id', action.spot.di)
      // console.log('newState', newState)
      delete newState[action.spot.id]
      return newState
    }
    default:
      return state;
  }
};

export default spotReducer;

// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD';
const ADD_ONE = 'spots/ADD_ONE';

const load = (list) => ({
  type: LOAD,
  list
});


const addOneSpot = (spot) => ({
  type: ADD_ONE,
  spot
});

export const createSpot = (data) => async (dispatch) => {
  console.log('---------------------------------- b4');

  const response = await csrfFetch("/api/spots", {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  console.log('---------------------------------- res',response);
  if (response.ok) {
    console.log('res is ok')
    const spot = await response.json();
    console.log('store', spot)
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

const initialState = {
  list: [],
  types: []
};

// const sortList = (list) => {
//   return list
//     .sort((pokemonA, pokemonB) => {
//       return pokemonA.no - pokemonB.no;
//     })
//     .map((pokemon) => pokemon.id);
// };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allSpots = {};
      action.list.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return {
        ...state,
        ...allSpots
        // ...allSpots,
        // ...state,
        // list: action.list
      };
    }
    case ADD_ONE: {
      if (!state[action?.spot?.id]) {
        console.log('action', action)
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
    default:
      return state;
  }
};

export default spotReducer;

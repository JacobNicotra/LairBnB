// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD';
const load = (list) => ({
  type: LOAD,
  list
});

export const getSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const list = await response.json();
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
      console.log('---------------------------- allSpots --', allSpots)
      return {
        ...allSpots
        // ...allSpots,
        // ...state,
        // list: action.list
      };
    }
    default:
      return state;
  }
};

export default spotReducer;

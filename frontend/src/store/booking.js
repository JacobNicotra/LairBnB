// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const LOAD_ITEMS = 'spots/LOAD_ITEMS';
const ADD_ONE = 'spots/ADD_ONE';
const DELETE_ONE = 'spots/DELETE_ONE';

const load = (bookings, spotId) => ({
  type: LOAD_ITEMS,
  bookings,
  spotId
});


const addOneBooking = (booking) => ({
  type: ADD_ONE,
  booking
});

const removeSpot = (spot) => ({
  type: DELETE_ONE,
  spot
});

// {spotId: '1', startDate: Sat Dec 11 2021 22:55:23 GMT-0600 (Central Standard Time), 
// endDate: Tue Dec 14 2021 22: 55: 23 GMT - 0600(Central Standard Time)}

export const createBooking = (data) => async (dispatch) => {

  const spotId = data.spotId
  // const startDate = data.startDate
  // const endDate = data.endDate
  // console.log('data', data)

  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(addOneBooking(booking));
    return booking; // use jquery datepicker
  }
};

export const getBookings = (spotId) => async (dispatch) => {

  // console.log('data', spotId) 

  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const list = await response.json();
    console.log('response', response)

    dispatch(load(list, spotId));

  }
};

// export const deleteSpot = spotId => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'DELETE'

//   });
//   if (res.ok) {
//     const spot = await res.json()
//     dispatch(removeSpot(spot))
//     return (res)
//   }
// }

// export const updateSpot = (data, spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'put',
//     body: JSON.stringify(data)
//   });

//   if (response.ok) {
//     const spot = await response.json();
//     dispatch(addOneBooking(spot));
//     return spot;
//   }
// };

const initialState = {
  list: [],
  types: []
};

const sortList = (list) => {
  return list
    .sort((A, B) => {
      return A.id - B.id;
    })
    .map((booking) => booking.id);
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      // console.log('in load for booking')

      const newBookings = {};
      // console.log('ACTION LIST', action.list)
      action.bookings.forEach((booking) => {
        newBookings[booking.id] = booking;
      });
      const newState = {
        ...state,
        ...newBookings
      }

      return newState
    }
    case ADD_ONE: {
      // console.log('in add one for booking')
      if (!state[action.booking.id]) {
        const newState = {
          ...state,
          [action.booking.id]: action.booking
        };
        const bookingList = newState.list.map((id) => newState[id]);
        bookingList.push(action.booking);
        newState.list = bookingList;
        return newState;
      }
      return {
        ...state,
        [action.booking.id]: {
          ...state[action.booking.id],
          ...action.booking
        }
      };
    }
    case DELETE_ONE: {
      const newState = { ...state }

      delete newState[action.spot.id]
      return newState
    }
    default:
      return state;
  }
};

export default bookingReducer;

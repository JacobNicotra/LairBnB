// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const LOAD_ITEMS = 'spots/LOAD_ITEMS';
const LOAD_BOOKINGS = 'spots/LOAD_BOOKINGS';
const ADD_ONE = 'spots/ADD_ONE';
const DELETE_ONE = 'spots/DELETE_ONE';
const DELETE_ONE_BOOKING = 'spots/DELETE_ONE_BOOKING';

const load = (bookings, spotId) => ({
  type: LOAD_ITEMS,
  bookings,
  spotId
});

const loadBookingsForUser = (bookingsForUser, userId) => ({
  type: LOAD_BOOKINGS,
  bookingsForUser,
  userId
});


const addOneBooking = (booking) => ({
  type: ADD_ONE,
  booking
});

const removeSpot = (spot) => ({
  type: DELETE_ONE,
  spot
});
const removeBooking = (booking) => ({
  type: DELETE_ONE_BOOKING,
  booking
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
    // console.group('list', list)
    dispatch(load(list, spotId));

  }
};

export const getBookingsForUser = (userId,) => async (dispatch) => {

  // console.log('data', spotId) 

  const response = await csrfFetch(`/api/users/${userId}/bookings`);

  if (response.ok) {
    const bookingsForUser = await response.json();

    // let bookingsForUserArr = []
    // for (let booking in bookingsForUser) {
    //   if (bookingsForUser[booking].spotId === +spotId) {
    //     bookingsForUserArr.push(bookingsForUser[booking])
    //   }
    // }
    // console.log('response', bookingsForUserArr)
    
    dispatch(loadBookingsForUser(bookingsForUser, userId));
    
    return bookingsForUser
  }
};

export const deleteBooking = bookingId => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'

  });
  if (res.ok) {
    const booking = await res.json()
    dispatch(removeBooking(booking))
    return (res)
  }
}

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

      const newBookings = {};
      // console.log('ACTION LIST', action.list)
      action.bookings.forEach((booking) => {
        newBookings[booking.id] = booking;
      });
      // const newState = {
      //   ...state,
      //   ...newBookings
      // }
      const newState = {
        ...state,
        bookingsForSpot: newBookings
      }
      
      return newState
    }
    case LOAD_BOOKINGS: {


      const newBookingsForUser = {};
      // console.log('ACTION LIST', action.list)
      action.bookingsForUser.forEach((booking) => {
        newBookingsForUser[booking.id] = booking;
      });
      // const newState = {
      //   ...state,
      //   ...newBookingsForUser
      // }
      const newState = {
        ...state,
        bookingsForUser: newBookingsForUser
      }

      return newState
    }
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
      if (!state[action?.booking?.id]) {

        const newState = {
          ...state,
          [action?.booking?.id]: action?.booking
        };
        const bookingList = newState.list.map((id) => newState[id]);
        bookingList.push(action.booking);
        newState.list = bookingList;

        return newState;
      }
      let newState = {
        ...state,
        [action.booking.id]: {
          ...state[action.booking.id],
          ...action.booking
        }
      };

      return newState
    }
    case DELETE_ONE: {
      const newState = { ...state }

      delete newState[action.spot.id]
      return newState
    }
    case DELETE_ONE_BOOKING: {
      const newState = { ...state }

      // console.log('DELETE_ONE_BOOKING state at bookig', newState[action.booking?.bookingsForUser.id])
    

      delete newState[action.booking.id]
      delete newState.bookingsForSpot[action.booking.id]
      delete newState.bookingsForUser[action.booking.id]
      return newState
    }
    default:
      return state;
  }
};

export default bookingReducer;

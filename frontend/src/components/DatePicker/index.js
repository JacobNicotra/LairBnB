import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDays } from 'date-fns';
import DatePicker from "react-datepicker";

import { createBooking, getBookings, getBookingsForUser, deleteBooking } from '../../store/booking'

import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker({ spotId, userId, spot }) {
  const dispatch = useDispatch();

  let day = new Date()
  day.setHours(0, 0, 0, 0)

  // const [date, setDate] = useState(new Date());

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [booked, setBooked] = useState();
  const [errors, setErrors] = useState([]);
  const [bookingsUser, setBookingsUser] = useState([]);


  const bookings = useSelector(state => {
    let bookingArr = []
    for (let booking in state.booking?.bookingsForSpot) {
      if (state.booking.bookingsForSpot[booking].spotId === + spotId) {
        bookingArr.push(state.booking?.bookingsForSpot[booking])
      }
    }
    return bookingArr
  });

  const bookingsForUserForSpot = useSelector(state => {
    
    let bookingArr = []
    let bookingObj = {}
   

    bookingObj = { ...state.booking?.bookingsForUser, ...state.booking }

  

    for (let booking in bookingObj) {
      if (bookingObj[booking].spotId && bookingObj[booking].spotId === +spotId) {
          bookingArr.push(bookingObj[booking])

        
      }
    }
    return bookingArr
  });


  useEffect(() => {

    dispatch(getBookings(spotId));
    let bookingRes = dispatch(getBookingsForUser(userId));

  }, [dispatch, booked, spotId]);



  let excludeArr = []

  const exluder = (booking) => {
    let exludeObj = {}

    let newTime = booking.checkIn.concat(' GMT-0600')

    let tempDay = new Date(newTime)

    exludeObj.start = tempDay

    newTime = booking.checkOut.concat(' GMT-0600')

    tempDay = new Date(newTime)

    exludeObj.end = tempDay

    excludeArr.push(exludeObj)
  }

  bookings.forEach(exluder)

  const checkDates = (e) => {
    // console.log('checkIn', checkIn, 'checkOut', checkOut, checkIn > checkOut)

    if (checkIn > checkOut) {
      // console.log('checkIn greater')
      setErrors([...errors, "Please choose a check-out date that is your check-in date"])
      return
    }
  }

  function isBookingForbidden(start, end) {
     let forbidden = false
     excludeArr.forEach(date => {
      //  console.log('is it true', start < end)
      //  console.log('date', date)
      //  console.log('start', start, '!!!!!!!!!!!!!!!!!!! date.start', date.start, start < date.start)
       if (start < date.start && date.start < end ) {
         forbidden = true
       }
    })
  
    return forbidden;
  }

  const handleBook = async (e) => {
    e.preventDefault()
    // console.log('checkIn', checkIn, 'checkOut', checkOut, checkIn > checkOut)
// 
    if (!checkIn) {
      setErrors([...errors, "Your booking contains forbidden dates! Please provide a valid check-in date. Check the Calendar to make sure your choosen date is available."])
      return
    }
    if (!checkOut) {
      setErrors([...errors, "Your booking contains forbidden dates! Please provide a valid check-out date, which is after your check-in date. Check the calendar to make sure your choosen date is available."])
      return
    }

    if (isBookingForbidden(checkIn, checkOut)) {
      setErrors([...errors, "Your booking contains forbidden dates! Your visit shall not overlap the visit of another guest!"])
    return 
    }

    if (checkIn < new Date() || checkOut < new Date()) {
      setErrors([...errors, "Your booking contains forbidden dates! Your visit shall time travel!"])
    return 
    }



    setCheckIn(checkIn?.setHours(0, 0, 0, 0))
    setCheckOut(checkOut?.setHours(0, 0, 0, 0))
    const booking = await dispatch(createBooking({
      checkIn,
      checkOut,
      spotId,
      userId
    }))

    if (booking) {
      setCheckIn()
      setCheckOut()
      setBooked(true)
      return
    } else alert('There was an error with your booking.')


  }

  const handleDeleteBooking = async (e) => {
    let bookingId = e.target.id
    // console.log('bookingId', bookingId)
    await dispatch(deleteBooking(bookingId))
  }

  if (!bookings) {
    return null;
  }
  return (
    <div className="outer-booking">

      <div className="booking-container">
        <div className="checkIn-holder">

          <DatePicker
            className="checkIn"
            selected={checkIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            maxDate={checkOut}
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={date => setCheckIn(date)}
            placeholderText="Choose a check-in date"

            // excludeDates={[
            //   new Date('2021-12-25'), new Date('2021-12-26'),
            //   {
            //     after: new Date('2021, 12, 20'),
            //     before: new Date('2021, 12, 23'),
            //   },
            // ]}
            excludeDateIntervals={excludeArr}


          // selectsDisabledDaysInRange
          />
        </div><div className="between-dates">  -  </div>
        <div className="checkOut-holder">

          <DatePicker
            className="checkOut"
            selected={checkOut}
            startDate={checkIn}
            minDate={checkIn}
            endDate={checkOut}
            selectsEnd
            checkIn={checkIn}
            checkOut={checkOut}
            minDate={checkIn}
            onChange={date => setCheckOut(date)}
            placeholderText="...and stay a while!"
            excludeDateIntervals={excludeArr}



          // excludeDates={[new Date('2021-12-25'), new Date('2021-12-26'),]}
          // selectsDisabledDaysInRange

          />
        </div>
        <button className="small-btn" onClick={handleBook}>Book this lair</button>

      </div >
      <div className="booking-erros-and-list">

      { errors.length > 0 &&
      <ul className="create-spot-error-container error-holder">
        {errors.map((error, idx) => <li key={idx}>* {error}</li>)}
      </ul>

      }

      <ul className="bookings-on-spot-list">
        {bookingsForUserForSpot.map((booking) => <li
          key={booking.id}>{`You have a booking at this lair for ${booking.checkIn} through ${booking.checkOut}`}
          <button id={booking.id} onClick={ handleDeleteBooking }className="small-btn small-red-btn">Delete</button>
        </li>)}
      </ul>

      </div>
      
    </div>
  );

}

{/* <DatePicker
selected={startDate}
onChange={onChange}
startDate={startDate}
endDate={endDate}
excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
selectsRange
selectsDisabledDaysInRange
inline
/>


<DatePicker
selectsRange={true}
startDate={startDate}
endDate={endDate}
onChange={(update) => {
  setDateRange(update);
}}
isClearable={true}
/> */}


// // filter dates
// () => {
//   const [startDate, setStartDate] = useState(null);
//   const isWeekday = (date) => {
//     const day = getDay(date);
//     return day !== 0 && day !== 6;
//   };
//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       filterDate={isWeekday}
//       placeholderText="Select a weekday"
//     />
//   );
// };
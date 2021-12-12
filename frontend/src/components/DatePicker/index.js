import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDays } from 'date-fns';
import DatePicker from "react-datepicker";

import { createBooking, getBookings } from '../../store/booking'

import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker({ spotId, userId, spot }) {
  const dispatch = useDispatch();

  let day = new Date()
  day.setHours(0, 0, 0, 0)

  // const [date, setDate] = useState(new Date());

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [booked, setBooked] = useState(false);

  const bookings = useSelector(state => {

    let bookingArr = []
    for (let booking in state.booking) {
      if (state.booking[booking].spotId === + spotId) {
        bookingArr.push(state.booking[booking])
      }
    }
    return bookingArr
  });

  // console.log('bookings', bookings)

  useEffect(() => {

    dispatch(getBookings(spotId));

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

    console.log('exludeObj', exludeObj)

    excludeArr.push(exludeObj)
  }

  bookings.forEach(exluder)

  // console.log('excludeArr', excludeArr)


  const handleBook = async (e) => {
    e.preventDefault()
    setCheckIn(checkIn.setHours(0, 0, 0, 0))
    setCheckOut(checkOut.setHours(0, 0, 0, 0))

    const booking = await dispatch(createBooking({
      checkIn,
      checkOut,
      spotId,
      userId
    }))

    if (booking) {
      setCheckIn(new Date())
      setCheckOut(new Date())
      setBooked(true)
      return
    } else alert('There was an error with your booking')


  }

  if (!bookings) {
    return null;
  }

  return (
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

        // excludeDates={[new Date('2021-12-25'), new Date('2021-12-26'),]}
        // selectsDisabledDaysInRange

        />
      </div>
      <button className="small-btn" onClick={handleBook}>Book this lair</button>

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

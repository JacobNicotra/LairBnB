const express = require('express')
const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Picture, User, Booking } = require('../../db/models');

const spotValidations = require('../../validations/spots');

const router = express.Router();

// router.get('/', asyncHandler(async function (_req, res) {
//   const bookings = await Booking.findAll({
//     // include: [
//     //   { model: User }
//     // ]
//   });
 

  
//   return res.json(bookings);
// }));

router.get('/:id', asyncHandler(async function (req, res) {
  const id = +req.params.id 
  const booking = await Booking.findByPk(id);
 
  return res.json(booking);
}));

router.delete('/:id', asyncHandler(async function (req, res) {
  const id = +req.params.id 
  const booking = await Booking.findByPk(id);
  
  await booking.destroy()
 
  return res.json(booking);
}));

module.exports = router;

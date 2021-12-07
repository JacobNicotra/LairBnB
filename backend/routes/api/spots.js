// backend/routes/api/users.js
const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

// ...
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res) {
  const spots = await Spot.findAll();
  console.log('----------------------------------------------------------------------- the spots: ', spots)
  return res.json(spots);
}));

//delete this

// Sign up
// router.post(
//   '/',
//   asyncHandler(async (req, res) => {
//     const { email, password, username } = req.body;
//     const user = await User.signup({ email, username, password });

//     await setTokenCookie(res, user);

//     return res.json({
//       user,
//     });
//   }),
// );

module.exports = router;

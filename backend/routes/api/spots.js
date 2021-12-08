// backend/routes/api/users.js
const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Picture } = require('../../db/models');

const spotValidations = require('../../validations/spots');

// ...
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

router.get('/', asyncHandler(async function (_req, res) {
  const spots = await Spot.findAll();
  const findPics = async (spot) => { 
     return await Picture.findAll({
    where: {
      spotId: spot.id
    }
  })
  }
  for (const spot of spots) {
    const pics = await findPics(spot)
    spot.dataValues.pictures = pics
    
  }
  return res.json(spots);
}));


router.post(
  '/',
  spotValidations.validateCreate,
  asyncHandler(async function (req, res) {
    console.log('Req.Body',req.body)
    // console.log('reqbody', req.body)
    const pictures = req.body.pics
    delete req.body.pics
    const spot = await Spot.create(req.body);

    for (let key in pictures) {
      console.log('-------THE PICS', pictures, pictures[key])
      let newPic = {}
      newPic.picture = pictures[key]
      newPic.spotId = spot.id
      console.log('newPic', newPic)
      let newPicDb = await Picture.create(newPic)
    }
    // console.log('post creation', req.body)
    // console.log('pics', pictures)
    return res.json(spot);
  })
);


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

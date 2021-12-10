// backend/routes/api/users.js
const express = require('express')
const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Picture, User } = require('../../db/models');

const spotValidations = require('../../validations/spots');



// ...
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

router.get('/', asyncHandler(async function (_req, res) {
  const spots = await Spot.findAll({
    include: [
      { model: User }
    ]
  });
  let date = spots[0].dataValues.createdAt
  console.log('TYPE: ',typeof date)
  console.log(date)

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

router.get('/:id', asyncHandler(async function (req, res) {
  const spotId = +req.params.id
  const spot = await Spot.findByPk(spotId);

  const findPics = async (spot) => {
    return await Picture.findAll({
      where: {
        spotId: spot.id
      }
    })
  }
  await findPics(spot)

  spot.dataValues.pictures = pics

  return res.json(spots);
}));


router.post(
  '/',
  spotValidations.validateCreate,
  asyncHandler(async function (req, res) {

    const incomingPictures = req.body.pics
    delete req.body.pics
    const spot = await Spot.create(req.body);
    const user = await User.findByPk(req.body.userId)
    const username = user.username
    spot.dataValues.User = { username }
    const pictures = []
    for (let key in incomingPictures) {
      let newPic = {}
      newPic.picture = incomingPictures[key]
      newPic.spotId = spot.id
      let newPicDb = await Picture.create(newPic)
      pictures.push(newPicDb)
    }
    spot.dataValues.pictures = pictures
    return res.json(spot);
  })
);


router.put(
  '/:id',
  [spotValidations.validateCreate],
  asyncHandler(async function (req, res) {
    let incomingPictures = req.body.pics
    delete req.body.pics
    const spotId = +req.params.id
    const spot = await Spot.findByPk(spotId);
    const newSpot = await spot.update(req.body)

    let picsInDb = await Picture.findAll({
      where: {
        spotId
      }
    })

    for (let pic of picsInDb) {
      await pic.destroy()
    }

    let pictures = []
    for (let key in incomingPictures) {
      let newPic = {}
      newPic.picture = incomingPictures[key]
      newPic.spotId = spotId

      let newPicDb = await Picture.create(newPic)
      pictures.push(newPicDb)
    }
    spot.dataValues.pictures = pictures
    return res.json(spot);



  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const spotId = req.params.id


    const spot = await Spot.findByPk(spotId)


    const pics = await Picture.findAll({
      where: {
        spotId
      }
    })

    if (pics.length > 0) {

      for (let pic of pics) {
        await pic.destroy()
      }
    }

    await spot.destroy()

    return res.json(spot)
  })
)


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

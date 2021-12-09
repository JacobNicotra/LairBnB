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
    // console.log('Req.Body', req.body)
    // console.log('reqbody', req.body)
    const incomingPictures = req.body.pics
    delete req.body.pics
    const spot = await Spot.create(req.body);

    const pictures = []
    for (let key in incomingPictures) {
      // console.log('-------THE PICS', incomingPictures, incomingPictures[key])
      let newPic = {}
      newPic.picture = incomingPictures[key]
      newPic.spotId = spot.id
      // console.log('newPic', newPic)
      let newPicDb = await Picture.create(newPic)
      pictures.push(newPicDb)
    }
    // console.log('post creation', req.body)
    // console.log('pics', pictures)
    spot.dataValues.pictures = pictures
    // console.log('api spot', spot)
    return res.json(spot);
  })
);


router.put(
  '/:id',
  spotValidations.validateCreate,
  asyncHandler(async function (req, res) {
    let incomingPictures = req.body.pics
    delete req.body.pics
    const spotId = +req.params.id
    const spot = await Spot.findByPk(spotId);
    const newSpot = await spot.update(req.body)
    // console.log('newSpot', newSpot)
    // console.log('incomingPictures', incomingPictures)

    let picsInDb = await Picture.findAll({
      where: {
        spotId
      }
    })

    // console.log('picsInDb', picsInDb)
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
    // console.log('spot', spot)
    return res.json(spot);


    // const id = await PokemonRepository.update(req.body);
    // const pokemon = await PokemonRepository.one(id);
    // return res.json(pokemon);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const spotId = req.params.id

    // console.log('spotId', spotId)

    const spot = await Spot.findByPk(spotId)

    // console.log('spot', spot)

    const pics = await Picture.findAll({
      where: {
        spotId
      }
    })
    // console.log('pics[0]', pics[0])

    if (pics.length > 0) {

      for (let pic of pics) {
        console.log('pic: ', pic)
        await pic.destroy()
        // console.log('---------------  pic dest')
      }
    }

    await spot.destroy()

    // console.log('spot destroyed')
    // console.log('pics destroyed')
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

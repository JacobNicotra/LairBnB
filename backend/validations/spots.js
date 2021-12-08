const { check } = require('express-validator');
// const { types } = require('../db/models/pokemonType');
// const { handleValidationErrors } = require('./utils');

const id = check('id')
  .notEmpty()
  .isInt({ min: 0 });
// const no = check('no')
//   .notEmpty()
//   .isInt({ min: 0 });
// const attack = check('attack')
//   .notEmpty()
//   .isInt({ min: 0, max: 100 })
//   .toInt();
// const defense = check('defense')
//   .notEmpty()
//   .isInt({ min: 0, max: 100 })
//   .toInt();
// const imageUrl = check('imageUrl')
//   .notEmpty()
//   .isURL({ require_protocol: false, require_host: false });
const title = check('title').notEmpty();
const description = check('description').notEmpty()
const userId = check('userId').notEmpty()

exports.validateCreate = [
  id, title, description, userId
];

// exports.validateUpdate = [
//   id,
//   no,
//   attack,
//   defense,
//   imageUrl,
//   name,
//   type,
//   moves,
//   handleValidationErrors,
// ];

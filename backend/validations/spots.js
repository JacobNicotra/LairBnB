const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');
const { body, validationResult } = require('express-validator');


const id = check('id')
  .notEmpty()
  .isInt({ min: 0 });
const title = check('title')
  .notEmpty()
  .isLength({ min: 5 })
  .withMessage('Please make the title a little longer than that...')
const description = check('description')
  .notEmpty()
  .isLength({ min: 10 })
  .withMessage('Please make your description more... descriptive.')

const userId = check('userId').notEmpty()

exports.validateCreate = [
  title, description, userId, handleValidationErrors
];

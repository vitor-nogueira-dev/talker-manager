const { validateTalker } = require('./validateTalker');
const validateAuthenticator = require('./validateAuth');
const validateRate = require('./validateRate');
const validateDate = require('./validateDate');
const validateRatePatch = require('./validateRatePatch');
const validateSearch = require('./validateSearch');
const validateLogin = require('./validateLogin');

module.exports = {
  validateTalker,
  validateAuthenticator,
  validateRate,
  validateDate,
  validateRatePatch,
  validateSearch,
  validateLogin,
};

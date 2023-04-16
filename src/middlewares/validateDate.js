const { validRegexDate } = require('../utils/constants');

const validateDate = async (req, res, next) => {
  const { date } = req.query;
  if (date && !validRegexDate.test(date)) {
    return next({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
      status: 400, 
    });
  }
  return next();
};

module.exports = validateDate;

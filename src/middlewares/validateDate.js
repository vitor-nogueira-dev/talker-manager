const files = require('../files');

const validateDate = async (req, res, next) => {
  const { date } = req.query;
  if (date) {
    const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!watchedAtRegex.test(date)) {
      return res.status(400).json({
        message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
      });
    }
  }
  return next();
};

module.exports = validateDate;

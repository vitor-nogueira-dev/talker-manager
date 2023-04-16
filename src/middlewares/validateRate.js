const { validNumberRate } = require('../helpers/functions');

const validateRate = async (req, _res, next) => {
  const { rate } = req.query;
  if (rate && !validNumberRate(rate)) {
    return next({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      status: 400,
    });
  }

  return next();
};

module.exports = validateRate;

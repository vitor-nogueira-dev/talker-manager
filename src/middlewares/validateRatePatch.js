const { validNumberRate } = require('../helpers/functions');

const validateRatePatch = async (req, res, next) => {
  const { rate } = req.body;
  if (rate === undefined) {
    return next({ message: 'O campo "rate" é obrigatório', status: 400 });
  }
  if (rate === 0) {
    return next({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      status: 400,
    });
  }
  if (rate && !validNumberRate(rate)) {
    return next({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      status: 400,
    });
  }
  return next();
};

module.exports = validateRatePatch;

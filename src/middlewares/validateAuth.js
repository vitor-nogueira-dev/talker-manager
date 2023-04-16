const { throwError } = require('../helpers/functions');
const { validRegexToken } = require('../utils/constants');

const validateAuthenticator = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return throwError('Token não encontrado', 401);
  }

  if (!authorization.match(validRegexToken) || authorization.length !== 16) {
    return throwError('Token inválido', 401);
  }

  return next();
};

module.exports = validateAuthenticator;

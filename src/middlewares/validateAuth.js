const validateAuthenticator = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenRegExp = /[a-z0-9]{16}/i;

  if (!authorization) {
    return res.next({ statusCode: 401, message: 'Token não encontrado' });
  }
  if (!authorization.match(tokenRegExp) || authorization.length !== 16) {
    return res.next({ statusCode: 401, message: 'Token inválido' });
  }
  return next();
};

module.exports = validateAuthenticator;

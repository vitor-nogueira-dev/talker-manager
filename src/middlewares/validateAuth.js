const validateAuthenticator = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenRegExp = /[a-z0-9]{16}/i;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (!authorization.match(tokenRegExp) || authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateAuthenticator;

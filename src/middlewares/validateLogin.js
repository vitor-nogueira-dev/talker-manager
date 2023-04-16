const { validRegexEmail } = require('../utils/constants');

const validateEmail = (email) => {
  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  }

  const isEmail = validRegexEmail.test(email);
  
  if (!isEmail) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error('O campo "password" é obrigatório');
  }

  if (password.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
};

const validateUser = (req, res, next) => {
  try {
    const { email, password } = req.body;

    validateEmail(email);
    validatePassword(password);

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = validateUser;

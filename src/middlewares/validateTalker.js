const throwError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

const validateName = (name) => {
  if (!name) throwError('O campo "name" é obrigatório', 400);
  if (name.length < 3) {
    throwError('O "name" deve ter pelo menos 3 caracteres', 400);
  }
};

const validateAge = (age) => {
  if (!age) throwError('O campo "age" é obrigatório', 400);

  if (!Number.isInteger(age) || age < 18) {
    throwError(
      'O campo "age" deve ser um número inteiro igual ou maior que 18',
      400,
    );
  }
};

const validateDate = (date) => {
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtRegex.test(date)) {
    throwError('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 400);
  }
};

const validateWatchedAt = (watchedAt) => {
  if (!watchedAt) throwError('O campo "watchedAt" é obrigatório', 400);

  validateDate(watchedAt);
};

const validateRate = (rate) => {
  if (rate === undefined || rate === null) throwError('O campo "rate" é obrigatório', 400);

  if (!Number.isInteger(rate) || rate < 1 || rate > 5 || rate === 0) {
    throwError('O campo "rate" deve ser um número inteiro entre 1 e 5', 400);
  }

};

const validateTalk = (talk) => {
  const { watchedAt, rate } = talk || {};

  if (!talk) throwError('O campo "talk" é obrigatório', 400);

  validateWatchedAt(watchedAt);
  validateRate(rate);
};

const validateTalker = (req, res, next) => {
  try {
    const { name, age, talk } = req.body;

    validateName(name);
    validateAge(age);
    validateTalk(talk);

    next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { validateTalker };

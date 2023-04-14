const files = require('../files');
const searchByNameAndRate = require('./validateSearchAndRate');

const validateRate = async (req, res, next) => {
  const { q, rate } = req.query;
  if (!Number.isInteger(+rate) || +rate < 1 || +rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  if (q && +rate) return next();
  if (+rate) {
    const talkers = await files.readJsonFile();
    const filteredTalkers = talkers.filter(({ talk }) => talk.rate === +rate);
    return res.status(200).json(filteredTalkers);
  }
};

module.exports = validateRate;

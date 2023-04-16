const files = require('../files');
const { searchMultiple } = require('../helpers/functions');

const searchController = async (req, res) => {
  const talkersAll = await files.readJsonFile();
  const { q, rate, date } = req.query;
  if (!q && !rate && !date) {
    return res.status(200).json(talkersAll);
  }
  if (date === '') {
    return res.status(200).json(talkersAll);
  }

  const talkers = await searchMultiple(q, +rate, date);

  return res.status(200).json(talkers);
};

module.exports = searchController;
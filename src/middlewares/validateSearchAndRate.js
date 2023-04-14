const files = require('../files');

const searchTalkers = (req, res, talkers) =>
  res.status(talkers.length === 0 ? 404 : 200).json(talkers || []);

const searchByNameAndRate = async (name, rate) => {
  const talkers = await files.readJsonFile();
  console.log(talkers[0].talk.rate, 'entrei');
  return talkers.filter(
    (talker) =>
      talker.name.toLowerCase().includes(name.toLowerCase()) &&
      talker.talk.rate === rate
  );
};

const ifs = (q, rate) => {
  const promises = [];

  if (q && rate) {
    promises.push(searchByNameAndRate(q, rate));
  }

  return promises;
};

const validateSearchAndRate = async (req, res) => {
  const { q, rate } = req.query;

  const promises = ifs(q, +rate);

  const results = await Promise.all(promises);
  const talkers = results.flat();
  return searchTalkers(req, res, talkers);
};

module.exports = { validateSearchAndRate };


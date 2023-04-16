const files = require('../files');

const addTalkerController = async (req, res) => {
  const talkers = await files.readJsonFile();
  const newTalker = { id: talkers.length + 1, ...req.body };
  talkers.push(newTalker);
  await files.writeJsonFile(talkers);
  return res.status(201).json(newTalker);
};

module.exports = addTalkerController;
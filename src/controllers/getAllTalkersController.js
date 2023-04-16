const files = require('../files');

const allTalkersController = async (_req, res) => {
  const result = await files.readJsonFile();
  return res.status(200).json(result || []);
};

module.exports = allTalkersController;
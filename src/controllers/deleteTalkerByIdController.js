const files = require('../files');

const deleteTalkerByIdController = async (req, res) => {
  const { id } = req.params;
  const talkers = await files.readJsonFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(talkerIndex, 1);
  await files.writeJsonFile(talkers);
  return res.sendStatus(204);
};

module.exports = deleteTalkerByIdController;
const files = require('../files');

const editTalkerByIdController = async (req, res) => {
  const { id } = req.params;
  const talkers = await files.readJsonFile();
  const editTalker = talkers.findIndex((talker) => talker.id === +id);
  if (editTalker === -1) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  const editedTalker = { id: talkers[editTalker].id, ...req.body };
  talkers[editTalker] = editedTalker;
  await files.writeJsonFile(talkers);
  return res.status(200).json(editedTalker);
};

module.exports = editTalkerByIdController;
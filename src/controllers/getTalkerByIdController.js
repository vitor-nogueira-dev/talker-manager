const files = require('../files');

const talkerByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await files.readJsonFile();
  const findTalker = result.find((talk) => talk.id === +id);
  if (findTalker) {
    return res.status(200).json(findTalker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = talkerByIdController;
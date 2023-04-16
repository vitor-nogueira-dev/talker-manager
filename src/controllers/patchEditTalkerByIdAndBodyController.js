const { findById } = require('../helpers/functions');
const files = require('../files');

const editTalkerByIdAndBody = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talkers = await files.readJsonFile();

  const talker = await findById(talkers, +id);
  if (talker === -1) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  talker.talk.rate = rate;
  await files.writeJsonFile([talker]);
  return res.sendStatus(204);
};

module.exports = editTalkerByIdAndBody;

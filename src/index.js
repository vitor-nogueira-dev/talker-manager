const express = require('express');

const files = require('./files');
const generateToken = require('./helpers/generateToken');
const validateUser = require('./middlewares/validateLogin');
const { validateTalker } = require('./middlewares/validateTalker');
const validateAuthenticator = require('./middlewares/validateAuth');
const validateRate = require('./middlewares/searchRate');
const {
  validateSearchAndRate,
} = require('./middlewares/searchAndRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker/search',
  validateAuthenticator,
  validateRate,
  validateSearchAndRate,
  async (req, res) => {
    const talkers = await files.readJsonFile();

    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(200).json(talkers);
    } else {
      const filteredTalkers = talkers.filter((talker) =>
        talker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return res.status(200).json(filteredTalkers);
    }
  }
);

app.get('/talker', async (_req, res) => {
  const result = await files.readJsonFile();
  return res.status(200).json(result || []);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await files.readJsonFile();
  const findTalker = result.find((talk) => talk.id === +id);
  if (findTalker) {
    return res.status(200).json(findTalker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateUser, async (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', validateTalker, async (req, res) => {
  const talkers = await files.readJsonFile();
  const newTalker = { id: talkers.length + 1, ...req.body };
  talkers.push(newTalker);
  await files.writeJsonFile(talkers);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validateTalker, async (req, res) => {
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
});

app.delete('/talker/:id', validateAuthenticator, async (req, res) => {
  const { id } = req.params;
  const talkers = await files.readJsonFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(talkerIndex, 1);
  await files.writeJsonFile(talkers);
  return res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('Online');
});

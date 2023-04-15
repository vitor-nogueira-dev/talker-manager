const express = require('express');

const files = require('./files');
const generateToken = require('./helpers/generateToken');
const validateUser = require('./middlewares/validateLogin');
const { validateTalker } = require('./middlewares/validateTalker');
const validateAuthenticator = require('./middlewares/validateAuth');
const validateRate = require('./middlewares/validateRate');
const validateDate = require('./middlewares/validateDate');

const { refactorData } = require('./helpers/functions');
const validateRatePatch = require('./middlewares/validateRatePatch');
const { findById } = require('./helpers/functions');
const { findAll } = require('./db/talkerDB');
const searchOptions = require('./helpers/searchOptions');
const validateSearch = require('./middlewares/validateSearch');

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
  validateSearch,
  validateRate,
  validateDate,
  async (req, res) => {
    const talkersAll = await files.readJsonFile();
    const { q, rate, date } = req.query;
    if (!q && !rate && !date) {
      return res.status(200).json(talkersAll);
    }
    if (date === '') {
      return res.status(200).json(talkersAll);
    }
    const { action } = searchOptions.find(({ search }) => search(q, +rate, date));
    
    const talkers = await action(q, +rate, date);

    return res.status(200).json(talkers);
  },
);

app.get('/talker/db', async (req, res) => {
  const [talkers] = await findAll();
  const newArray = talkers.map((obj) => refactorData(obj));
  if (newArray.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(newArray);
});

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

app.post('/talker', validateAuthenticator, validateTalker, async (req, res) => {
  const talkers = await files.readJsonFile();
  const newTalker = { id: talkers.length + 1, ...req.body };
  talkers.push(newTalker);
  await files.writeJsonFile(talkers);
  return res.status(201).json(newTalker);
});

app.put(
  '/talker/:id',
  validateAuthenticator,
  validateTalker,
  async (req, res) => {
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
  },
);

app.delete('/talker/:id', validateAuthenticator, async (req, res) => {
  const { id } = req.params;
  const talkers = await files.readJsonFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(talkerIndex, 1);
  await files.writeJsonFile(talkers);
  return res.sendStatus(204);
});

app.patch(
  '/talker/rate/:id',
  validateAuthenticator,
  validateRatePatch,
  async (req, res) => {
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
  },
);

app.listen(3001, () => {
  console.log('Online', PORT);
});

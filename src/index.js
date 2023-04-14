const express = require('express');

const files = require('./files');
const generateToken = require('./helpers/generateToken');
const validateUser = require('./middlewares/validateLogin');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
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


app.listen(PORT, () => {
  console.log('Online');
});

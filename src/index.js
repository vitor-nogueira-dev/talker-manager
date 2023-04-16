const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const login = require('./routes/login');
const talkers = require('./routes/talkers');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', login);
app.use('/talker', talkers);
app.use(errorHandler);

app.listen(3001, () => {
  console.log('Online', PORT);
});

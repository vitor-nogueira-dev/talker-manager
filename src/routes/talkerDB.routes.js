const express = require('express');
const Controllers = require('../controllers/importControllers');

const router = express.Router();

router.get('/db', Controllers.allTalkersDBController);

module.exports = router;

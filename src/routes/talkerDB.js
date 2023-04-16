const express = require('express');
const controllers = require('../controllers/importControllers');

const router = express.Router();

router.get('/db', controllers.allTalkersDBController);

module.exports = router;

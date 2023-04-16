const express = require('express');
const middlewares = require('../middlewares/importMidlewares');
const controllers = require('../controllers/importControllers');

const router = express.Router();

router.post('/', middlewares.validateLogin, controllers.addUserController);

module.exports = router;

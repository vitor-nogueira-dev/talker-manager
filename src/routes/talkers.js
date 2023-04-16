const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/importMidlewares');
const controllers = require('../controllers/importControllers');

const midlewaresTalkerSearch = [
  middlewares.validateAuthenticator,
  middlewares.validateSearch,
  middlewares.validateRate,
  middlewares.validateDate,
];

router.get(
  '/search',
  midlewaresTalkerSearch,
  controllers.searchController,
);

router.get('/', controllers.allTalkersController);
router.get('/db', controllers.allTalkersDBController);
router.get('/:id', controllers.talkerByIdController);

router.post(
  '/',
  middlewares.validateAuthenticator,
  middlewares.validateTalker,
  controllers.addTalkerController,
);

router.put(
  '/:id',
  middlewares.validateAuthenticator,
  middlewares.validateTalker,
  controllers.editTalkerByIdController,
);

router.delete(
  '/:id',
  middlewares.validateAuthenticator,
  controllers.deleteTalkerByIdController,
);

router.patch(
  '/rate/:id',
  middlewares.validateAuthenticator,
  middlewares.validateRatePatch,
  controllers.editTalkerByIdAndBodyController,
);

module.exports = router;

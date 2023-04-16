const searchController = require('./getSearchController');
const allTalkersController = require('./getAllTalkersController');
const talkerByIdController = require('./getTalkerByIdController');
const addTalkerController = require('./addTalkerController');
const editTalkerByIdController = require('./putTditTalkerByIdController');
const deleteTalkerByIdController = require('./deleteTalkerByIdController');
const editTalkerByIdAndBodyController = require('./patchEditTalkerByIdAndBodyController');
const addUserController = require('./addUserController');
const allTalkersDBController = require('./getAllTalkersDBController');

module.exports = {
  searchController,
  allTalkersController,
  talkerByIdController,
  addTalkerController,
  editTalkerByIdController,
  deleteTalkerByIdController,
  editTalkerByIdAndBodyController,
  addUserController,
  allTalkersDBController,
};

const { findAll } = require('../db/talkerDB');
const { refactorData } = require('../helpers/functions');

const allTalkersDBController = async (req, res) => {
  const [talkers] = await findAll();
  const newArray = talkers.map((obj) => refactorData(obj));
  if (newArray.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(newArray);
};

module.exports = allTalkersDBController;
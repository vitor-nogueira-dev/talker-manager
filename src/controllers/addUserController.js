const generateToken = require('../helpers/generateToken');

const addUserController = async (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
};

module.exports = addUserController;
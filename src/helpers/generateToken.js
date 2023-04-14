const crypto = require('crypto');

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token.toUpperCase();
}

module.exports = generateToken;
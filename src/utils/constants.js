const validRegexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const validRegexToken = /[a-z0-9]{16}/i;
const validRegexDate = /^\d{2}\/\d{2}\/\d{4}$/;

module.exports = { validRegexEmail, validRegexToken, validRegexDate };
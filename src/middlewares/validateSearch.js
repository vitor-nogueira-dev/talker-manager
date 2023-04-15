const validateSearch = (req, res, next) => {
  const { q, rate, date } = req.query;
  if (q === undefined && rate === undefined && date === undefined) {
    return res.status(200).json([]);
  }
  return next();
};

module.exports = validateSearch;

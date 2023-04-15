const validateSearch = (req, res, next) => {
  const { q, rate, date } = req.query;
  console.log(q, rate, date, '3');
  if (q && rate && date === undefined) {
    console.log('to aqui');
    return res.status(200).json([]);
  }
  return next();
};

module.exports = validateSearch;

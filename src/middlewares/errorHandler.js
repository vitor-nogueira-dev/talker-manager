const errorHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  return res
    .status(status || 500)
    .json({ message } || { message: 'Error captured in express' });
};

module.exports = errorHandler;

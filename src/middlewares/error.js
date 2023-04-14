const errorHandle = (err, _req, res, _next) => {
  const { statusCode, message } = err;
  console.log(message, 'err')
  return res
    .status(statusCode || 500)
    .json({ message } || { message: 'Error captured in express' });
};

module.exports = errorHandle;

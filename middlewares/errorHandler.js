const { NotFoundError, message404, message500 } = require('../errors/errors');

// Обработчик ошибки 404
const notFound = () => {
  throw new NotFoundError(message404.request);
};

// Централизованный обработчик ошибок
const centralizedProcessing = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? message500.server : message,
  });
  next();
};

module.exports = { notFound, centralizedProcessing };

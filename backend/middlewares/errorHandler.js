const { HTTP_SERVER_ERROR } = require('../errors/errors_status');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = errorHandler;

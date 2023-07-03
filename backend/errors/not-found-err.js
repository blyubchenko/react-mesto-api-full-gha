const { HTTP_NOT_FOUND } = require('./errors_status');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_NOT_FOUND;
  }
}

module.exports = NotFoundError;

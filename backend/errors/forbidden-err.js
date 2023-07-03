const { HTTP_FORBIDDEN } = require('./errors_status');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_FORBIDDEN;
  }
}

module.exports = ForbiddenError;

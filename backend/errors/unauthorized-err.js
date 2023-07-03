const { HTTP_UNAUTHORIZED } = require('./errors_status');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

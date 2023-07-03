const { HTTP_CONFLICT } = require('./errors_status');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CONFLICT;
  }
}

module.exports = ConflictError;

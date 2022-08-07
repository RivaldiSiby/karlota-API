const ClientError = require("./ClientError");

class ForbidenError extends ClientError {
  constructor(message, statusCode = 403) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ForbidenError";
  }
}

module.exports = ForbidenError;

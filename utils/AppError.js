class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.status = statusCode < 400 ? "success" : "fail";
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

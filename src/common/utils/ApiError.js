class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request") {
    return new ApiError(400, message);
  }

  static unAuthorised(message = "You are unauthorised") {
    return new ApiError(401, message);
  }

  static conflict(message = "Conflict") {
    return newApiError(409, message);
  }
}

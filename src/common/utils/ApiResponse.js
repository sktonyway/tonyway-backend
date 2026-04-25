class ApiResponse {
  constructor(statusCode = 200, message = "Success", data = null) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data = null, message = "Success") {
    return new ApiResponse(200, message, data);
  }

  static created(data = null, message = "Created successfully") {
    return new ApiResponse(201, message, data);
  }

  static accepted(data = null, message = "Accepted") {
    return new ApiResponse(202, message, data);
  }

  static noContent(message = "No content") {
    return new ApiResponse(204, message, null);
  }
}

export default ApiResponse;

import ApiError from "../../utils/ApiError.js"; // this will be sent to notfound

export const notFound = (req, res, next) => {
  const error = ApiError.notFound(`Not Found - ${req.originalUrl}`);

  // Pass the custom error to the global error handler
  next(error);
};

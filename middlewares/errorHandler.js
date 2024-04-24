import { statusCodes } from "../statusCodes.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error!";
  
  let response = {
    title: "Error",
    message: errorMessage,
    stackTrace: err.stack,
  };

  switch (statusCode) {
    case statusCodes.BAD_REQUEST:
      response.title = "Failed To Validate";
      break;
    case statusCodes.FORBIDDEN:
      response.title = "Forbidden";
      break;
    case statusCodes.NOT_FOUND:
      response.title = "Not Found";
      break;
    case statusCodes.UNAUTHORIZED:
      response.title = "Unauthorized";
      break;
    case statusCodes.OK:
      response.title = "Success";
      break;
    default:
      response.title = "Internal Server Error";
      break;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;

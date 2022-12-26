function errorHandler(error, req, res, next) {
  let code = 500;
  let message = "Internal Server Error";
  console.log(error);
  if (error.name === "NotFound") {
    code = 404;
    message = "Member not found";
  } else if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    code = 400;
    message = error.errors[0].message;
  }
  res.status(code).json({ message });
}

module.exports = { errorHandler };

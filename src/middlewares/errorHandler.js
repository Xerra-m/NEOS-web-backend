export const globalError = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message:
      statusCode === 404
        ? "404 Page Not Found In NEOS"
        : "500 Server Error, contact Admin or Developer",
    detail: err.message,
  });
};

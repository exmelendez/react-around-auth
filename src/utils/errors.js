module.exports.requestError = (err, req, res) => {
  let ERROR_CODE = 0;

  switch (err.name) {
    case 'CastError':
      ERROR_CODE = 400;
      break;

    case 'ValidationError':
      ERROR_CODE = 404;
      break;

    case 'NotFound':
      ERROR_CODE = 404;
      break;

    default:
      ERROR_CODE = 500;
      break;
  }

  return res.status(ERROR_CODE).send({ message: err.message });
};

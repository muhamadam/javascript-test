const CatchResponse = ({
  res,
  err
}) => {
  let statusCode = 500;
  let error = 'Server Error';

  if (err.statusCode) {
    ({ statusCode } = err);
  }

  if (err.error) {
    ({ error } = err);
  }

  res.status(statusCode).json({
    success: false,
    error
  });
};

export default CatchResponse;

const apiResponseHandler = (req, res, next) => {
  res.successResponse = (code, message, data, statusCode) => {
    // eslint-disable-next-line quotes
    message = "success"
    return res.status(code).json({ status: statusCode, message, data })
  }
}

module.exports = {
  apiResponseHandler
}

const errorHandler = (err, req, res, _next) => {
  let error = { ...err }
  error.message = err.message

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error.message = `Resource not found with ID of ${err.value}`
    return res.status(404).json({
      success: false,
      message: error.message,
    })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    error.message = `Duplicate field value entered: ${field}`
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {}).map((val) => val.message).join(', ')
    error.message = message || 'Validation failed'
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token',
    })
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = errorHandler


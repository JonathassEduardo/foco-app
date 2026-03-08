const { ZodError } = require('zod')
const errors = require('./errors')

function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(errors.VALIDATION_ERROR.status).json({
      code: errors.VALIDATION_ERROR.code,
      message: errors.VALIDATION_ERROR.message,
      details: err.errors
    })
  }

  if (err.code && err.status) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message
    })
  }

  console.error(err)

  return res.status(errors.INTERNAL_SERVER_ERROR.status).json({
    code: errors.INTERNAL_SERVER_ERROR.code,
    message: errors.INTERNAL_SERVER_ERROR.message
  })
}

module.exports = errorHandler
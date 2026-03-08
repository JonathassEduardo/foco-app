class AppError extends Error {
  constructor(error) {
    super(error.message)

    this.code = error.code
    this.status = error.statusCode
  }
}

module.exports = AppError
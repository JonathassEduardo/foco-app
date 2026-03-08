const { User } = require('../../models')
const AppError = require('../../errors/AppError')
const errors = require('../../errors/errors')

class FindUserService {
  async execute(userId) {
    const user = await User.findByPk(userId)

    if (!user) {
      throw new AppError(errors.USER_NOT_FOUND)
    }

    return user
  }
}

module.exports = FindUserService
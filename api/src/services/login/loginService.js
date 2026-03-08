const { User } = require('../../models')
const AppError = require('../../errors/AppError')
const errors = require('../../errors/errors')
const { signToken, setAuthCookie } = require('../../middleware/auth')

class LoginService {
  async execute(data, res) {
    const user = await User.findOne({ where: { email: data.email } })

    if (!user) {
      throw new AppError(errors.INVALID_CREDENTIALS)
    }

    const valid = await user.comparePassword(data.password)

    if (!valid) {
      throw new AppError(errors.INVALID_CREDENTIALS)
    }

    const token = signToken({ userId: user.id })
    setAuthCookie(res, token)

    return user
  }
}

module.exports = LoginService
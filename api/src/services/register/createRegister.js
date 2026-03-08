const { User } = require('../../models')
const AppError = require('../../errors/AppError')
const errors = require('../../errors/errors')
const { signToken, setAuthCookie } = require('../../middleware/auth')

class RegisterService {
  async execute(data, res) {
    const existing = await User.findOne({ where: { email: data.email } })

    if (existing) {
      throw new AppError(errors.EMAIL_ALREADY_EXISTS)
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    const token = signToken({ userId: user.id })
    setAuthCookie(res, token)

    return user
  }
}

module.exports = RegisterService
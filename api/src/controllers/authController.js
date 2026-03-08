const RegisterService = require('../services/register/createRegister')
const LoginService = require('../services/login/loginService')
const FindUserService = require('../services/users/findUser')
const { registerSchema, loginSchema } = require('../schemas/userSchema')
const { clearAuthCookie } = require('../middleware/auth')

class AuthController {
  async register(req, res, next) {
    try {
      const data = registerSchema.parse(req.body)

      const service = new RegisterService()
      const user = await service.execute(data, res)

      return res.status(201).json({ user })
    } catch (error) {
      return next(error)
    }
  }

  async login(req, res, next) {
    try {
      const data = loginSchema.parse(req.body)

      const service = new LoginService()
      const user = await service.execute(data, res)

      return res.json({ user })
    } catch (error) {
      return next(error)
    }
  }

  async logout(req, res, next) {
    try {
      clearAuthCookie(res)
      return res.json({ message: 'Sessão encerrada.' })
    } catch (error) {
      return next(error)
    }
  }

  async me(req, res, next) {
    try {
      const service = new FindUserService()
      const user = await service.execute(req.userId)

      return res.json({ user })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new AuthController()
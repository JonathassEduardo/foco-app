const jwt = require('jsonwebtoken')
const { jwt: jwtConfig } = require('../config/env.js')

function signToken(payload) {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
}

function setAuthCookie(res, token) {
  res.cookie(jwtConfig.cookieName, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    domain: 'localhost',
    path: '/',       // ← adicione
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

function clearAuthCookie(res) {
  res.clearCookie(jwtConfig.cookieName)
}

function authMiddleware(req, res, next) {
  const token = req.cookies?.[jwtConfig.cookieName]

  if (!token) {
    return res.status(401).json({ code: 'AUTH-401', message: 'Não autenticado.' })
  }

  try {
    const payload = jwt.verify(token, jwtConfig.secret)
    req.userId = payload.userId
    next()
  } catch {
    clearAuthCookie(res)
    return res.status(401).json({ code: 'AUTH-401', message: 'Sessão inválida ou expirada.' })
  }
}

module.exports = { signToken, setAuthCookie, clearAuthCookie, authMiddleware }
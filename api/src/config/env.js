require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,

  database: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || 'database.sqlite'
  },

  nodeEnv: process.env.NODE_ENV || 'development',

  jwt: {
    secret: process.env.JWT_SECRET || 'troca_esse_secret_em_producao',
    expiresIn: '7d',
    cookieName: 'auth_token'
  }
}
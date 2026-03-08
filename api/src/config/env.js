require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,

  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'foco_app',
    username: process.env.DB_USER || 'foco_user',
    password: process.env.DB_PASSWORD || '11329750',
  },

  nodeEnv: process.env.NODE_ENV || 'development',

  jwt: {
    secret: process.env.JWT_SECRET || 'troca_esse_secret_em_producao',
    expiresIn: '7d',
    cookieName: 'auth_token'
  }
}
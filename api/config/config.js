require('dotenv').config()

module.exports = {
  development: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'foco_app',
    username: process.env.DB_USER || 'foco_user',
    password: String(process.env.DB_PASSWORD),
  },

  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },

  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
  }
}
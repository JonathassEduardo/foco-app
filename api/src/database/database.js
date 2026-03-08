require('dotenv').config()
const { Sequelize } = require('sequelize')
const config = require('../config/env')

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  String(config.database.password),
  {
    dialect: config.database.dialect,
    host: config.database.host,
    port: config.database.port,
    logging: false,
  }
)

module.exports = sequelize
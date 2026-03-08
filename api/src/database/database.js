const { Sequelize } = require('sequelize')
const config = require('../config/env')

const sequelize = new Sequelize({
  dialect: config.database.dialect,
  storage: config.database.storage,
  logging: false
})

module.exports = sequelize
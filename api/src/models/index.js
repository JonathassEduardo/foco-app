'use strict'

const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')
const config = require('../config/env')

const basename = path.basename(__filename)
const db = {}

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

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
    console.log('Models carregados:', Object.keys(db))
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
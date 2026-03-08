'use strict'

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
  })

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10)
  })

  User.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  User.prototype.comparePassword = async function (plain) {
    return bcrypt.compare(plain, this.password)
  }

  return User
}
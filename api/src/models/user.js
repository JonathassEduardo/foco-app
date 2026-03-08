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
  })

  // Hash antes de criar
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10)
  })

  // Remove a senha do JSON retornado
  User.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  // Compara senha em texto plano com o hash
  User.prototype.comparePassword = async function (plain) {
    return bcrypt.compare(plain, this.password)
  }

  return User
}
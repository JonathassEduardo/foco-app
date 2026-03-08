'use strict'

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'done'),
      defaultValue: 'pending'
    },
     userId: {
    type: DataTypes.UUID,
    allowNull: true,
  }
  }, {
    tableName: 'tasks',
  })

  return Task
}
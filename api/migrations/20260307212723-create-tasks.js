'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      dueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM('pending', 'in_progress', 'done'),
        defaultValue: 'pending'
      },

      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tasks')
  }
}
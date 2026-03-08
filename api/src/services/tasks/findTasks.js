const { Task } = require('../../models')

class FindTasksService {
  async execute(userId) {
    return await Task.findAll({ where: { userId } })
  }
}

module.exports = FindTasksService
const { Task } = require('../../models')
const errors = require('../../errors/errors')
const AppError = require('../../errors/AppError')

class CreateTaskService {
  async execute(data, userId) {
    if (!data.title) {
      throw new AppError(errors.INVALID_TASK_DATA)
    }

    const taskData = this.#prepareData(data, userId)

    const task = await Task.create(taskData)
    return task
  }

  #prepareData(data, userId) {
    return {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      status: data.status,
      priority: data.priority,
      userId,
    }
  }
}

module.exports = CreateTaskService
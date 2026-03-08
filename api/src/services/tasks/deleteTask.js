const { Task } = require('../../models')
const errors = require('../../errors/errors')
const AppError = require('../../errors/AppError')

class DeleteTaskService {
  async execute(id, userId) {
    const task = await this.#findTask(id, userId)
    await task.destroy()
  }

  async #findTask(id, userId) {
    const task = await Task.findOne({ where: { id, userId } })

    if (!task) {
      throw new AppError(errors.TASK_NOT_FOUND)
    }

    return task
  }
}

module.exports = DeleteTaskService
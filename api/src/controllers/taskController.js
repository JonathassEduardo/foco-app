const CreateTaskService = require('../services/tasks/createTask')
const FindTasksService = require('../services/tasks/findTasks')
const UpdateTaskService = require('../services/tasks/updateTask')
const DeleteTaskService = require('../services/tasks/deleteTask')

const { createTaskSchema, updateTaskSchema } = require('../schemas/taskSchema')

class TaskController {
  async create(req, res, next) {
    try {
      const data = createTaskSchema.parse(req.body)

      const service = new CreateTaskService()
      const task = await service.execute(data, req.userId)

      return res.status(201).json(task)
    } catch (error) {
      return next(error)
    }
  }

  async list(req, res, next) {
    try {
      const service = new FindTasksService()
      const tasks = await service.execute(req.userId)

      return res.json(tasks)
    } catch (error) {
      return next(error)
    }
  }

  async update(req, res, next) {
    try {
      const data = updateTaskSchema.parse(req.body)

      const service = new UpdateTaskService()
      const task = await service.execute(req.params.id, data, req.userId)

      return res.json(task)
    } catch (error) {
      return next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const service = new DeleteTaskService()
      await service.execute(req.params.id, req.userId)

      return res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new TaskController()
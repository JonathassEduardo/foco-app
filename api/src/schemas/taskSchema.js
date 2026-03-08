const { z } = require('zod')

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),

  status: z.enum(['pending', 'in_progress', 'done']),

  priority: z.enum(['low', 'medium', 'high'])
})

const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),

  status: z.enum(['pending', 'in_progress', 'done']).optional(),

  priority: z.enum(['low', 'medium', 'high']).optional()
})

module.exports = {
  createTaskSchema,
  updateTaskSchema
}
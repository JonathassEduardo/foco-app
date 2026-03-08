module.exports = {
  TASK_NOT_FOUND: {
    code: 'TSK-404',
    message: 'Task not found',
    status: 404
  },

  TASK_ALREADY_EXISTS: {
    code: 'TSK-409',
    message: 'Task already exists',
    status: 409
  },

  INVALID_TASK_DATA: {
    code: 'TSK-400',
    message: 'Invalid task data',
    status: 400
  },

  VALIDATION_ERROR: {
    code: 'VAL-400',
    message: 'Validation error',
    status: 400
  },

  UNAUTHORIZED: {
    code: 'AUTH-401',
    message: 'Unauthorized',
    status: 401
  },

  FORBIDDEN: {
    code: 'AUTH-403',
    message: 'Forbidden',
    status: 403
  },

  DATABASE_ERROR: {
    code: 'DB-500',
    message: 'Database error',
    status: 500
  },

  INTERNAL_SERVER_ERROR: {
    code: 'INT-500',
    message: 'Internal server error',
    status: 500
  },

    INVALID_CREDENTIALS: {
    statusCode: 401,
    code: 'AUTH-401',
    message: 'E-mail ou senha incorretos.',
  },

  EMAIL_ALREADY_EXISTS: {
    statusCode: 409,
    code: 'AUTH-409',
    message: 'E-mail já cadastrado.',
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    code: 'USR-404',
    message: 'Usuário não encontrado.',
  },

}
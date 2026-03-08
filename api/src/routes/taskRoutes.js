const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

router.post('/tasks', taskController.create)
router.get('/tasks', taskController.list)
router.put('/tasks/:id', taskController.update)
router.delete('/tasks/:id', taskController.delete)

module.exports = router
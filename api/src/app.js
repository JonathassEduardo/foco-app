const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { authMiddleware } = require('./middleware/auth')
const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/auth')
const errorHandler = require('./errors/errorHandler')

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', authMiddleware, taskRoutes)

app.use(errorHandler)

module.exports = app
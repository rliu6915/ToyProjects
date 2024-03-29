const express = require('express')

const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')

const testingRouter = require('./controllers/testing')

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

const mongoUrl = config.MONGODB_URI
// console.log('mongoUrl', mongoUrl)
logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

// app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use('/api/blogs', commentsRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

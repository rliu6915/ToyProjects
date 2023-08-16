const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id
  const comments = await Blog.findById(id).populate('comments')
  console.log('comments', comments)
  response.json(comments)
})

module.exports = commentsRouter


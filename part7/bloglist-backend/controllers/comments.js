const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id
  const comments = await Blog.findById(id).populate('comments')
  console.log('comments', comments)
  response.json(comments)
})

commentsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)
  const comment = new Comment({
    content: body.content,
    blog: id
  })
  const saveComment = await comment.save()
  blog.comments = blog.comments.concat(saveComment)
  await blog.save()
  response.status(201).json(saveComment)
})

module.exports = commentsRouter


const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.likes) {
    body.likes = 0
  }
  // console.log('body', body)

  const user = await User.findById(body.user)
  // console.log('user', user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })
  // console.log('blog', blog)

  const saveBlog = await blog.save()
  // console.log('saveBlog', saveBlog)
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()

  response.status(201).json(saveBlog)
  // try {
  //   const saveBlog = await blog.save()
  //   response.status(201).json(saveBlog)
  // } catch (exception) {
  //   next(exception)
  // }

  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result)
  //   })
  //   .catch((err) => next(err))
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter

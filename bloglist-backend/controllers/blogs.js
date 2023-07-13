const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   console.log('authorization', authorization)
//   if (authorization && authorization.startsWith('Bearer')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.likes) {
    body.likes = 0
  }
  // console.log('body', body)
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // // console.log('decodedToken', decodedToken)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // // console.log('user', user)
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
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
  // console.log('req.params.id', req.params.id)
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  // console.log('blog', blog)

  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // // console.log('decodedToken', decodedToken)
  // if (!decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = req.user
  // console.log('user', user)
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'unauthorized user' })
  }
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

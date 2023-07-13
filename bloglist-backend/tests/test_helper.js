const Blog = require('../models/blog')
const User = require('../models/user')

const bcrypt = require('bcrypt')

// blogs

const initialBlogs = [
  {
    title: 'test title',
    author: 'test author',
    url: 'test url',
  },
  {
    title: 'test title 2',
    author: 'test author 2',
    url: 'test url 2',
  }
]

const nonExistingId = async () => {
  const newBlog = new Blog({
    author: 'test author 4',
    url: 'test url 4',
    likes: 4,
  })
  await newBlog.save()
  await newBlog.deleteOne()

  return newBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// users

const passwordHash = bcrypt.hash('test password', 10)
const passwordHash2 = bcrypt.hash('test password 2', 10)

const initialUsers = [
  {
    username: 'test username',
    name: 'test name',
    password: passwordHash,
  },
  {
    username: 'test username 2',
    name: 'test name 2',
    password: passwordHash2,
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
}
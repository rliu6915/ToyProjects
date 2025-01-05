const Blog = require('../models/blog')
const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// blogs
const user = User.findOne({ username: 'test username' })
const initialBlogs = [
  {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 1,
    user: user._id
  },
  {
    title: 'test title 2',
    author: 'test author 2',
    url: 'test url 2',
    likes: 2,
    user: user._id,
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
    passwordHash: passwordHash.toString(),
  },
  {
    username: 'test username 2',
    name: 'test name 2',
    passwordHash: passwordHash2.toString(),
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// login
const token = async () => {
  const user = await User.findOne({ username: 'test username' })
  console.log('user', user)
  const token = jwt.sign(
    { 
      username: user.username, 
      id: user._id 
    }, 
    process.env.SECRET,
    { expiresIn: 60 * 60})
  console.log('token', token)
  return token
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
  token,
}
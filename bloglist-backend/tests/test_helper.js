const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
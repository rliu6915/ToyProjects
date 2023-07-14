const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('test password', 10)
  const user = new User({ 
    username: 'test username', 
    name: 'test name',
    passwordHash: passwordHash.toString(),
  })
  // console.log('user', user)
  await user.save()

  // const token = jwt.sign(
  //   { 
  //     username: user.username, 
  //     id: user._id 
  //   }, 
  //   process.env.SECRET,
  //   { expiresIn: 60 * 60}
  // )
  

  await Blog.deleteMany({})
  // console.log('cleared')

  // helper.initialBlogs.forEach(async (blog) => {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  //   console.log('saved')
  // })

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  // console.log('done')
  // let blogObject = new Blog(helper.initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(helper.initialBlogs[1])
  // await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    // console.log('enter test')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    expect(titles).toContain('test title')
    expect(titles).toContain('test title 2')
  })

  test('a existence of id property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)
    expect(ids).toBeDefined()
  })
})

// describe('viewing a specific blog', () => {

// })

describe('addition of a new blog', () => {
  // test('a valid blog can be added', async () => {
  //   const newBlog = {
  //     title: 'test title 3',
  //     author: 'test author 3',
  //     url: 'test url 3',
  //     likes: 3,
  //   }

  //   const token = helper.token()
  //   console.log('token', token)
  
  //   await api
  //     .post('/api/blogs')
  //     .set({'Authorization': `Bearer ${helper.token()}`})
  //     .send(newBlog)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/)
  
  //   // const response = await api.get('/api/blogs')
  //   // const titles = response.body.map(b => b.title)
  
  //   const blogsAtEnd = await helper.blogsInDb()
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  //   const titles = blogsAtEnd.map(b => b.title)
  //   expect(titles).toContain('test title 3')
  // })
  
  // test('blog without like is added & its like is default to 0', async () => {
  //   const newBlog = {
  //     title: 'test title 4',
  //     author: 'test author 4',
  //     url: 'test url 4',
  //   }
  
  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/)
  
  //   // const response = await api.get('/api/blogs')
  
  //   const blogsAtEnd = await helper.blogsInDb()
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  //   const likesArray = blogsAtEnd.map(b => b.likes)
  //   expect(likesArray[likesArray.length - 1]).toBe(0)
  // })
  
  // test('blog without title is not added', async () => {
  //   const newBlog = {
  //     author: 'test author 4',
  //     url: 'test url 4',
  //     likes: 4,
  //   }
  
  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(400)
  
  //   // const response = await api.get('/api/blogs')
  
  //   const blogsAtEnd = await helper.blogsInDb()
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  // })
  
  // test('blog without url is not added', async () => {
  //   const newBlog = {
  //     title: 'test title 4',
  //     author: 'test author 4',
  //     likes: 4,
  //   }
  
  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(400)
  
  //   // const response = await api.get('/api/blogs')
  
  //   const blogsAtEnd = await helper.blogsInDb()
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  // })
})

// describe('deletion of a blog', () => {
//   test('a blog can be deleted', async () => {
//     const blogAtStart = await helper.blogsInDb()
//     const id = blogAtStart[0].id
    
//     await api
//       .delete(`/api/blogs/${id}`)
//       .expect(204)
    
//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

//     const titles = blogsAtEnd.map(b => b.title)
//     expect(titles).not.toContain('test title')
//   })
// })

// describe('update of a blog', () => {
//   test('a blog can be updated', async () => {
//     const blogAtStart = await helper.blogsInDb()
//     const id = blogAtStart[0].id
//     const updatedBlog = {
//       title: 'test title updated',
//       author: 'test author updated',
//       url: 'test url updated',
//       likes: 100,
//     }

//     await api
//       .put(`/api/blogs/${id}`)
//       .send(updatedBlog)
//       .expect(200)

//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

//     const titles = blogsAtEnd.map(b => b.title)
//     expect(titles).toContain('test title updated')

//   })
// })

afterAll(() => {
  mongoose.connection.close()
})


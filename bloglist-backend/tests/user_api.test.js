const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach( async () => {
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

// describe('when there is initially one user in db', () => {

// })

describe('addition of a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      username: 'test username 3',
      name: 'test name 3',
      password: 'test password 3',
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with status code 400 if username is already taken', async () => {
    const newUser = {
      username: 'test username',
      name: 'test name 4',
      password: 'test password 4',
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    // console.log(result.body)
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
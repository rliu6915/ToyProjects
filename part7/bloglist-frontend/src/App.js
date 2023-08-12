import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import storageService from './services/storage'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogCreate from './components/BlogCreate'
import ToggLable from './components/ToggLable'
import { deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { createBlog } from './reducers/blogReducer'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import Individual from './components/Individual'

import Home from './components/Home'

const App = () => {
  const dispatch = useDispatch()

  const loginUser = useSelector(state => state.loginUser)
  // console.log('loginUser', loginUser)

  const users = useSelector(state => state.users)
  console.log('users', users)
  const match = useMatch('/users/:id')
  const currentUser = match
    ? users.find(user => user.id === match.params.id)
    : null
  console.log('currentUser', currentUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const user = storageService.getUser()
    if (user) {
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
    }
    // console.log('user', user)
  }, [])

  useEffect(() => {
    storageService.saveUser(loginUser)
  }, [loginUser])

  // login form
  const handelLogin = async (loginObject) => {
    try {
      dispatch(setUser(loginObject))
    } catch (exception) {
      dispatch(setNotification({
        text: 'Wrong username or password',
        type: 'error'
      }, 5))
    }
  }

  if (loginUser === null) {
    return (
      <div>
        <LoginForm
          createLogin={handelLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Logout />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<Individual user={currentUser} />} />
        {/* <Route path='/blogs/:id' element={<Blog />} /> */}
        {/* <ToggLable buttonLabel='create blog' ref={blogCreateRef}>
          <BlogCreate
            createBlog={addBlog}
          />
        </ToggLable>
        <BlogList
          blogLike={blogLike}
          blogDelete={blogDelete}
        /> */}
      </Routes>
    </div>
  )
}

export default App
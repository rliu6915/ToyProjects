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

const App = () => {
  const dispatch = useDispatch()

  const loginUser = useSelector(state => state.loginUser)
  // console.log('loginUser', loginUser)

  useEffect(() => {
    dispatch(initializeBlogs())
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

  // create blog
  const blogCreateRef = useRef()

  const addBlog = async (blogObject) => {
    blogCreateRef.current.toggleVisibility()
    dispatch(setNotification({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: 'notification'
    }, 5))

    dispatch(createBlog(blogObject))
  }

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

  // like
  const blogLike = (blogObject) => {
    dispatch(likeBlog(blogObject.id, blogObject))
  }

  // delete blog
  const blogDelete = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      dispatch(deleteBlog(blogObject.id))
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
      <ToggLable buttonLabel='create blog' ref={blogCreateRef}>
        <BlogCreate
          createBlog={addBlog}
        />
      </ToggLable>
      <BlogList
        blogLike={blogLike}
        blogDelete={blogDelete}
      />
    </div>
  )
}

export default App
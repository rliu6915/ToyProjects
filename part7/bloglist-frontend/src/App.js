import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogCreate from './components/BlogCreate'
import ToggLable from './components/ToggLable'
import { deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { createBlog } from './reducers/blogReducer'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [notification, setNotification] = useState(null)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )
  // }, [blogs])
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    // console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('user', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogCreateRef = useRef()

  // create blog

  const addBlog = async (blogObject) => {
    blogCreateRef.current.toggleVisibility()
    // const returnedBlog = await blogService.create(blogObject)

    // setNotification({
    //   text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    //   type: 'notification'
    // })
    // setTimeout(() => {
    //   setNotification(null)
    // }, 5000)
    dispatch(setNotification({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: 'notification'
    }, 5))

    // setBlogs(blogs.concat(returnedBlog))
    dispatch(createBlog(blogObject))
  }

  // login form

  const handelLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification({
        text: 'Wrong username or password',
        type: 'error'
      }, 5))
      // setErrorMessage({
      //   text: 'Wrong username or password',
      //   type: 'error'
      // })
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  // logout

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // like
  const blogLike = (blogObject) => {
    // const newBlog = {
    //   ...blogObject,
    //   likes: blogObject.likes + 1
    // }

    // const returnedBlog = await blogService.like(newBlog.id, newBlog)
    // setBlogs(
    //   blogs.map(
    //     blog => blog.id !== returnedBlog.id ? blog : returnedBlog
    //   )
    // )
    dispatch(likeBlog(blogObject.id, blogObject))
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          createLogin={handelLogin}
        />
      </div>
    )
  }

  // delete blog

  const blogDelete = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      // await blogService.remove(blogObject.id)
      // (blogs.filter(blog => blog.id !== blogObject.id))
      dispatch(deleteBlog(blogObject.id))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Logout user={user} handleLogout={handleLogout} />
      <ToggLable buttonLabel='create blog' ref={blogCreateRef}>
        <BlogCreate
          createBlog={addBlog}
        />
      </ToggLable>
      <BlogList
        user={user}
        blogLike={blogLike}
        blogDelete={blogDelete}
      />
    </div>
  )
}

export default App
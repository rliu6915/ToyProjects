import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogCreate from './components/BlogCreate'
import ToggLable from './components/ToggLable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

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

  // create blog

  const addBlog = async ({blogObject}) => {
    const returnedBlog = await blogService.create(blogObject)
    setNotification({
      text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'notification'
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog))
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
      setErrorMessage({
        text: 'Wrong username or password',
        type: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // logout

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          createLogin={handelLogin}
          errorMessage={errorMessage}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <Logout user={user} handleLogout={handleLogout} />
      <ToggLable buttonLabel='create blog'>
        <BlogCreate 
          createBlog={addBlog}
        />
      </ToggLable>
      <BlogList user={user} blogs={blogs} />
    </div>
  )
}

export default App
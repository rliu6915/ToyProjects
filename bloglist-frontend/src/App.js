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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  // blog form
  const [title, setTtitle] = useState('')
  const [author, setAutor] = useState('')
  const [url, setUrl] = useState('')

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

  // blog form

  const addBlog = async (e) => {
    e.preventDefault()
    // console.log('addBlog', e.target.title.value)
    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }

    const returnedBlog = await blogService.create(blogObject)
    // console.log('returnedBlog', returnedBlog)
    setNotification({
      text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'notification'
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog))

    setTtitle('')
    setAutor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    // console.log(event.target.value)
    setTtitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    // console.log(event.target.value)
    setAutor(event.target.value)
  }

  const hanndleUrlChange = (event) => {
    // console.log(event.target.value)
    setUrl(event.target.value)
  }

  // login form

  const handelLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      // console.log('user', user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleUsernameChange = (event) => {
    // console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    // console.log(event.target.value)
    setPassword(event.target.value)
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
          handelLogin={handelLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
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
          addBlog={addBlog}
          title={title}
          handleTitleChange={handleTitleChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          url={url}
          hanndleUrlChange={hanndleUrlChange}
        />
      </ToggLable>
      <BlogList user={user} blogs={blogs} />
    </div>
  )
}

export default App
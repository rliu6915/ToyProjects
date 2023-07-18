import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import Notifcation from './components/Notification'

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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={(e) => setTtitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={(e) => setAutor(e.target.value)}
        />
      </div>   
      <div>
        url:
        <input
          type='text'
          value={url}
          name='url'
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>  
      <button type='submit'>
        create
      </button>
    </form>
  )

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

  const loginForm = () => (
    <form onSubmit={handelLogin}>
      <div>
        username:
        <input
          type='text'
          value={username}
          name='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password:
        <input
          type='password'
          value={password}
          name='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>
        login
      </button>
    </form>
  )

  // logout

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notifcation message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notifcation message={notification} />
      <Logout user={user} handleLogout={handleLogout} />
      <h2>create new</h2>
      {blogForm()}
      <BlogList user={user} blogs={blogs} />
    </div>
  )
}

export default App
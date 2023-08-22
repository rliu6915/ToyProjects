import { useEffect } from 'react'
import blogService from './services/blogs'
import storageService from './services/storage'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import Individual from './components/Individual'

import Home from './components/Home'
import BlogPage from './components/BlogPage'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()

  const loginUser = useSelector(state => state.loginUser)
  // console.log('loginUser', loginUser)

  const users = useSelector(state => state.users)
  // console.log('users', users)
  const match = useMatch('/users/:id')
  const currentUser = match
    ? users.find(user => user.id === match.params.id)
    : null
  // console.log('currentUser', currentUser)

  const blogs = useSelector(state => state.blogs)
  // console.log('blogs', blogs)

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

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

  if (loginUser === null) {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
      <Menu />
      <h2>blogs</h2>
      <Notification />
      {/* <Logout /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<Individual user={currentUser} />} />
        <Route path='/blogs/:id' element={<BlogPage />} />
      </Routes>
    </div>
  )
}

export default App
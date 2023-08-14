import Notification from './Notification'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeUser, setUser } from '../reducers/loginReducer'
import { useState } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  // login form
  const createLogin = async (loginObject) => {
    try {
      dispatch(setUser(loginObject))
    } catch (exception) {
      dispatch(setNotification({
        text: 'Wrong username or password',
        type: 'error'
      }, 5))
    }
  }

  const handelLogin = (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    createLogin({
      username: username,
      password: password
    })

    // setUsername('')
    // setPassword('')
    dispatch(removeUser())
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <Notification />

      <form onSubmit={handelLogin}>
        <div>
          username
          <input
            id = 'username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id = 'password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
import Notification from './Notification'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeUser, setUser } from '../reducers/loginReducer'
import { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  // login form
  const createLogin = async (loginObject) => {
    try {
      await dispatch(setUser(loginObject))
      dispatch(setNotification({
        text: `Welcome ${loginObject.username}`,
        variant: 'success'
      }, 5))
    } catch (exception) {
      dispatch(setNotification({
        text: 'Wrong username or password',
        variant: 'danger'
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

      <Form onSubmit={handelLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id = 'username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id = 'password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant='primary' id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
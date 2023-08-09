import Notification from './Notification'
import React, { useState } from 'react'

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handelLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    createLogin({
      username, password
    })

    setUsername('')
    setPassword('')
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
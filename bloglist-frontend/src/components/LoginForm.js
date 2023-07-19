import Notification from "./Notification"
import React, { useState } from 'react'

const LoginForm = ({ createLogin, errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handelLogin = async (event) => {
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

      <Notification message={errorMessage} />

      <form onSubmit={handelLogin}>
        <div>
          username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
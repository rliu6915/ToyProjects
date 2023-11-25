
import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('mluukkai')
  const [password, setPassword] = useState('secret')

  const submit = async (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

import Notify from './Notify'
import LoginForm from './LoginForm'

const Login = (props) => {
  if (!props.show) {
    return null
  }
  return (
      <div>
          <Notify errorMessage={props.errorMessage} />
          <h2>Login</h2>
          <LoginForm />
      </div>
  )
}

export default Login;

import { useDispatch } from 'react-redux'
import { removeUser } from '../reducers/loginReducer'
import { useSelector } from 'react-redux'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(removeUser())
  }
  const loginUser = useSelector(state => state.loginUser)
  return (
    <>
      {loginUser.name} logged in
      <button onClick={handleLogout}>
        logout
      </button>
    </>
  )
}

export default Logout
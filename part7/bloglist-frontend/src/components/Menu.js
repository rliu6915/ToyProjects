
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Menu = () => {
  const padding = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={padding}>
      <Link to='/'>home </Link>
      <Link to='/users'>users </Link>
      <Logout />
    </div>
  )
}

export default Menu
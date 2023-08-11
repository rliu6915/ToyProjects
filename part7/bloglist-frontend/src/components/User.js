
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )
}

export default User
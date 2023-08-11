import User from './User'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  // console.log('users', users)

  return (
    <div>
      <h2>Users</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <User
                key={user.id}
                user={user}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
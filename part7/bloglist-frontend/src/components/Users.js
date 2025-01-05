import User from './User'
import { useSelector } from 'react-redux'

import Table from 'react-bootstrap/Table'

const Users = () => {
  const users = useSelector(state => state.users)
  // console.log('users', users)

  return (
    <div>
      <h2>Users</h2>
      <div>
        <Table striped bordered hover>
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
        </Table>
      </div>
    </div>
  )
}

export default Users
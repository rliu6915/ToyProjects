
const Logout = ({ user, handleLogout }) => {
  return (
    <div>
      <p> 
        {user.name} logged in 
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
    </div>
  )
}

export default Logout
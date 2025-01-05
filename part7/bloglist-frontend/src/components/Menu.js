
import { Link } from 'react-router-dom'
import Logout from './Logout'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Menu = () => {
  const padding = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid',
    // borderWidth: 1,
    marginBottom: 5
  }
  return (
    // <div style={padding}>
    //   <Link to='/'>home </Link>
    //   <Link to='/users'>users </Link>
    //   <Logout />
    // </div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='mr-auto'>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/'>home </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/users'>users </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Logout />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
import { useSelector } from 'react-redux'
import Blog from './Blog'

import Table from 'react-bootstrap/Table'

const BlogList = () => {
  // const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

  const blogs = useSelector(state => state.blogs)
  // console.log('blogs', blogs)
  const copies = [...blogs]
  copies.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Table striped bordered hover>
        <tbody>
          {copies.map((blog, index) =>
            <Blog
              key={index}
              blog={blog}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList

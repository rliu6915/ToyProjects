import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <>
      <tr>
        <td>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </td>
        <td>
          {blog.author}
        </td>
      </tr>
    </>
  )
}

export default Blog
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ blogDelete, blogLike }) => {
  // const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

  const blogs = useSelector(state => state.blogs)
  // console.log('blogs', blogs)
  const copies = [...blogs]
  copies.sort((a, b) => b.likes - a.likes)

  const loginUser = useSelector(state => state.loginUser)
  console.log('loginUser in BL', loginUser)

  return (
    <div>
      {copies.map(blog =>
        <Blog
          key={blog.id}
          user={loginUser}
          blog={blog}
          hanldeLikeChange={() => blogLike(blog)}
          handelBlogDelete={() => blogDelete(blog)}
        />
      )}
    </div>
  )
}

export default BlogList

import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user, blogLike, blogDelete }) => {
  // const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

  const hanldeLikeChange = (blogObject) => {
    blogLike(blogObject)
  }

  const blogs = useSelector(state => state.blogs)
  // console.log('blogs', blogs)

  const copies = [...blogs]
  copies.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {copies.map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          hanldeLikeChange={() => hanldeLikeChange(blog)}
          handelBlogDelete={() => blogDelete(blog)}
        />
      )}
    </div>
  )
}

export default BlogList

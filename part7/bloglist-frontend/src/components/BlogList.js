import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user, blogDelete, blogLike }) => {
  // const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

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
          hanldeLikeChange={() => blogLike(blog)}
          handelBlogDelete={() => blogDelete(blog)}
        />
      )}
    </div>
  )
}

export default BlogList

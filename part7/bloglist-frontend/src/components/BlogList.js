import { useSelector } from 'react-redux'
import Blog from './Blog'

import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  // const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  // console.log('blogs', blogs)
  const copies = [...blogs]
  copies.sort((a, b) => b.likes - a.likes)

  console.log('copies', copies)

  // like
  const blogLike = (blogObject) => {
    dispatch(likeBlog(blogObject.id, blogObject))
  }

  // delete blog
  const blogDelete = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      dispatch(deleteBlog(blogObject.id))
    }
  }

  return (
    <div>
      {copies.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          hanldeLikeChange={() => blogLike(blog)}
          handelBlogDelete={() => blogDelete(blog)}
        />
      )}
    </div>
  )
}

export default BlogList


import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const BlogPage = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser)
  const blogs = useSelector(state => state.blogs)

  // const blogs = useSelector(state => state.blogs)
  // console.log('blogs', blogs)
  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const hanldeLikeChange = (blogObject) => {
    dispatch(likeBlog(blogObject.id, blogObject))
  }

  const handelBlogDelete = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      dispatch(deleteBlog(blogObject.id))
      navigate('/')
    }
  }

  // console.log('blog', blog)


  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes}
        <button className="likeButton" onClick={() => hanldeLikeChange(blog)}>like</button>
      </div>
      <div>
        {`added by ${blog.user.name}`}
      </div>
      <div>
        {blog.user.username === loginUser.username && (
          <div>
            <button onClick={() => handelBlogDelete(blog)}>remove</button>
          </div>
        )}
      </div>
      <div>
        <h2>comments</h2>
        <ul>
          {blog.comments.map((comment, index) => {
            return (
              <li key={index}>
                {comment}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default BlogPage
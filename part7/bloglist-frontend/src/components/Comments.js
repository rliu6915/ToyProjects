import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const Comments = () => {
  const blogs = useSelector(state => state.blogs)
  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  if (!blogs) {
    return null
  }

  return (
    <>
      <h2>comments</h2>
      <ul>
        {blog.comments.map((comment) => {
          return (
            <li key={comment.id}>
              {comment.content}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Comments
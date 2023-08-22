
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState('')

  const addComment = (newComment) => {
    console.log('add comment')
    dispatch(setNotification({
      text: `a new comment ${newComment.content} added`,
      variant: 'success'
    }, 5))
    dispatch(commentBlog(newComment))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addComment({
      content: comments,
      blog: blog.id
    })
    setComments('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="comment"
        name="comment"
        value={comments}
        onChange={({ target }) => setComments(target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
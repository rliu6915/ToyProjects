
import BlogCreate from './BlogCreate'
import BlogList from './BlogList'
import ToggLable from './ToggLable'

import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Home = () => {
  const dispatch = useDispatch()

  const blogCreateRef = useRef()
  const addBlog = async (blogObject) => {
    blogCreateRef.current.toggleVisibility()
    dispatch(setNotification({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: 'notification'
    }, 5))

    dispatch(createBlog(blogObject))
  }

  return (
    <div>
      <ToggLable buttonLabel='create blog' ref={blogCreateRef}>
        <BlogCreate
          createBlog={addBlog}
        />
      </ToggLable>
      <BlogList/>
    </div>
  )
}

export default Home
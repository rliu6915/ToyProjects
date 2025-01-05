
import BlogCreate from './BlogCreate'
import BlogList from './BlogList'
import ToggLable from './ToggLable'

import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { initializeBlogs } from '../reducers/blogReducer'

const Home = () => {
  const dispatch = useDispatch()

  const blogCreateRef = useRef()
  const addBlog = async (blogObject) => {
    blogCreateRef.current.toggleVisibility()
    dispatch(setNotification({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      variant: 'success'
    }, 5))

    dispatch(createBlog(blogObject))
    dispatch(initializeBlogs())
  }

  return (
    <div>
      <h2>Blogs</h2>
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
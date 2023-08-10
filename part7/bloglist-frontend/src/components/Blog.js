import { useSelector } from 'react-redux'
import React, { useState } from 'react'

const Blog = ({ blog, hanldeLikeChange, handelBlogDelete }) => {
  const loginUser = useSelector(state => state.loginUser)
  // console.log('loginUser in BL', loginUser)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleViewChange = () => {
    setVisible(!visible)
  }

  // console.log('blog.user.username', blog.user.name)
  // console.log('loginUser.username', loginUser.username)

  return (
    <div className="blog" style={blogStyle}>
      <div className="shortBlog" style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={handleViewChange}>view</button>
      </div>
      <div className="longBlog" style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={handleViewChange}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button className="likeButton" onClick={hanldeLikeChange}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.username === loginUser.username && (
          <div>
            <button onClick={handelBlogDelete}>remove</button>
          </div>
        )}
        {/* <div>
          <button onClick={handelBlogDelete}>remove</button>
        </div> */}
      </div>
    </div>
  )
}

export default Blog
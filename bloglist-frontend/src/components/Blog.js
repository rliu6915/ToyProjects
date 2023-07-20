import React, { useState } from 'react'

const Blog = ({blog, hanldeLikeChange}) => {
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


  return (
    <div className="blog" style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={handleViewChange}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={handleViewChange}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={hanldeLikeChange}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    </div>  
  )
}

export default Blog
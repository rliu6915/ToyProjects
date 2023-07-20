const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
    <div>
      {blog.title}
      <button>view</button>
    </div>
    <div>
      {blog.author}
    </div>
    <div>
      {blog.url}
    </div>
    <div>
      {blog.likes}
      <button>like</button>
    </div>
  </div>  
  )
}

export default Blog
import Blog from "./Blog"

const BlogList = ({user, blogs, blogLike, blogDelete}) => {
  const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

  const hanldeLikeChange = (blogObject) => {
    blogLike(blogObject)
  }

  return (
    <div>
      {blogsFiltered.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          hanldeLikeChange={() => hanldeLikeChange(blog)}
          handelBlogDelete={() => blogDelete(blog)}
        />
      )}
    </div>
  )
}

export default BlogList

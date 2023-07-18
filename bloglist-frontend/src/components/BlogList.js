import Blog from "./Blog"

const BlogList = ({user, blogs}) => {
  const blogsFiltered = blogs.filter(blog => blog.user.username === user.username)
  // console.log(blogsFiltered)

  return (
    <div>
      {blogsFiltered.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList

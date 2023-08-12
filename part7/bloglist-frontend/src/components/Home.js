
import Blog from './Blog'
import BlogCreate from './BlogCreate'
import BlogList from './BlogList'
import ToggLable from './ToggLable'

const Home = ({ blogCreateRef, addBlog }) => {
  return (
    <div>
      <ToggLable buttonLabel='create blog' ref={blogCreateRef}>
        <BlogCreate
          createBlog={addBlog}
        />
      </ToggLable>
      {/* <BlogList
        blogLike={blogLike}
        blogDelete={blogDelete}
      /> */}
      <BlogList />
    </div>
  )
}

export default Home
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      // console.log('action.payload', action.payload)
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    // console.log('blogs', blogs)
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(blogObject)
    dispatch(appendBlog(returnedBlog))
  }
}

export default blogSlice.reducer
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
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    addLike(state, action) {
      const id = action.payload
      const blogToChange = state.find(blog => blog.id === id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map(blog => blog.id !== id ? blog : changedBlog)
    }
  }
})

export const { appendBlog, setBlogs, removeBlog, addLike } = blogSlice.actions

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

export const likeBlog = (id, blogObject) => {
  return async (dispatch) => {
    const newBlog = {
      ...blogObject,
      likes: blogObject.likes + 1
    }
    const returnedBlog = await blogService.like(id, newBlog)
    dispatch(addLike(returnedBlog.id))
  }
}

export default blogSlice.reducer
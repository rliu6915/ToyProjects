import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    loginUser: (state, action) => {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    logoutUser: (state, action) => {
      return null
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export const initializeUser = (user) => {
  return (dispatch) => {
    dispatch(loginUser(user))
  }
}

export const setUser = (loginObject) => {
  return async (dispatch) => {
    const user = await loginService.login(loginObject)
    // storageService.saveUser(user)
    blogService.setToken(user.token)
    dispatch(loginUser(user))
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    storageService.removeUser()
    dispatch(logoutUser())
  }
}

export default userSlice.reducer
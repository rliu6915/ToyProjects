import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import useReducer from './reducers/userReducer'



const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loginUser: loginReducer,
    users: useReducer
  }
})

console.log('store', store.getState())

export default store
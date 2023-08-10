import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'



const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loginUser: loginReducer
  }
})

console.log('store', store.getState())

export default store
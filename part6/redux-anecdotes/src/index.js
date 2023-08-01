import React from 'react'
import ReactDOM from 'react-dom/client'
// import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'
import store from './store'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer,
// })

// const store = configureStore({
//   reducer: {
//     anecdotes: anecdoteReducer,
//     filter: filterReducer,
//   }
// })

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
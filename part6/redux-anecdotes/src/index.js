import React from 'react'
import ReactDOM from 'react-dom/client'
// import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'
import store from './store'
// import anecdoteService from './services/anecdotes'
// import { setAnecdotes } from './reducers/anecdoteReducer'
// import { appendAnecdote } from './reducers/anecdoteReducer'

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

// console.log(store.getState())

// anecdoteService.getAll().then(anecdotes => {
//   anecdotes.forEach(anecdote => {
//     store.dispatch(appendAnecdote(anecdote))
//   })
// })

// anecdoteService.getAll().then(anecdotes => {
//   store.dispatch(setAnecdotes(anecdotes))
// })


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
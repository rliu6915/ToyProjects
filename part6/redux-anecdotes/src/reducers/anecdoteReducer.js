import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'VOTE':
//       const id = action.data.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state.map(a => a.id !== id ? a : changedAnecdote)
//     case 'NEW_ANECDOTE':
//       const newAnecdote = asObject(action.data.content)
//       return state.concat(newAnecdote)
//     default:
//       return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content: content,
//       id: getId()
//     }
//   }
// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   // const newAnecdote = asObject(action.payload)
    //   state.push(action.payload)
    // },
    addVote(state, action) {
      // console.log('action', action)
      const id = action.payload
      // console.log('state', state)
      const anecdoteToChange = state.find(a => a.id === id)
      // console.log('anecdoteToChange', anecdoteToChange)
      anecdoteToChange.votes += 1
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    // dispatch(createAnecdote(newAnecdote))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVoteForAnec = (anecdote) => {
  return async (dispatch) => {
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(anecdote.id, newObject)
    dispatch(addVote(anecdote.id))
  }
}


export default anecdotesSlice.reducer
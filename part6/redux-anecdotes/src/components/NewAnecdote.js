import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'


const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    console.log('addAnecdote')
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    // send data to backend
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default NewAnecdote
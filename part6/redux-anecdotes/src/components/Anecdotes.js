import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import { showNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    if (filter === 'ALL') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)

  const handleOnClick = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(showNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(showNotification(''))
    }
    , 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleOnClick={() => handleOnClick(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes
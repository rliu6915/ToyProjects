import { useDispatch, useSelector } from 'react-redux'
// import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import { showNotification } from '../reducers/notificationReducer'
// import anecdoteServices from '../services/anecdotes'
import { addVoteForAnec } from '../reducers/anecdoteReducer'

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

  const handleOnClick = async (anecdote) => {
    // send data to backend
    // const newObject = {
    //   ...anecdote,
    //   votes: anecdote.votes + 1
    // }
    // await anecdoteServices.update(anecdote.id, newObject)
    // dispatch(addVote(anecdote.id))
    dispatch(addVoteForAnec(anecdote))
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
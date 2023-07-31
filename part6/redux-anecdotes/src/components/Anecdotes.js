import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleOnClick={() => dispatch(addVote(anecdote.id))}
        />
        // <div key={anecdote.id}>
        //   <div>
        //     {anecdote.content}
        //   </div>
        //   <div>
        //     has {anecdote.votes}
        //     <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
        //   </div>
        // </div>
      )}
    </div>
  )
}

export default Anecdotes
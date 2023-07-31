import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const generateId = () => (100000 * Math.random()).toFixed(0)

  const createAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: generateId()
      }
    }
  }

  const addAnecdote = (e) => {
    e.preventDefault()
    console.log('addAnecdote')
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const addVote = (id) => {
    return {
      type: 'VOTE',
      data: { id }
    }
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
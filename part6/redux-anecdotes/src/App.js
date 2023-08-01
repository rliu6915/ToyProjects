import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // const generateId = () => (100000 * Math.random()).toFixed(0)

  // const addAnecdote = (e) => {
  //   e.preventDefault()
  //   console.log('addAnecdote')
  //   const content = e.target.anecdote.value
  //   e.target.anecdote.value = ''
  //   dispatch(createAnecdote(content))
  // }

  // const addVote = (id) => {
  //   return {
  //     type: 'VOTE',
  //     data: { id }
  //   }
  // }

  // const vote = (id) => {
  //   console.log('vote', id)
  //   dispatch(addVote(id))
  // }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App
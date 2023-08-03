import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from 'react-query'
import requests from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(requests.createNew, {
    onSuccess: (newAnecdotes) => {
      // queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdotes))
    }
  })
  const updateAnecdoteMutation = useMutation(requests.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(updatedAnecdote)
  }

  // get all anecdotes

  const result = useQuery(
    'anecdotes',
    requests.getAll,
    {
      refetchOnWindowFocus: false
    }
  )
  // console.log('result', result)

  if (result.isLoading) {
    return <div>loading...</div>
  }
  
  const anecdotes = result.data
  // console.log('anecdotes', anecdotes)

  // add new anecdote

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log('new anecdote', content)
    const newAnecdote = {
      content,
      votes: 0
    }
    newAnecdoteMutation.mutate(newAnecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm
        onCreate={onCreate}
      />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

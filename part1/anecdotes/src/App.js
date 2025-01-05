import { useState } from 'react'

/* create a button that displays a random anecdote from the array of anecdotes. */
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

/* create a component that displays the anecdote with the most votes */
const Anecdote = ({ anecdote, votes }) => {
  console.log("anecdote after", anecdote)
  console.log("votes after", votes)
  /* find the index of the anecdote with the most votes */
  const max = votes.indexOf(Math.max(...votes))
  console.log("max", max)
  return (
    <>
      <p>
        {anecdote[max]}
      </p>
      <p>This anecdote has {votes[max]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  // const [votes, setVotes] = useState(0)
  /* store the votes of each anecdote into an array in the component's state */
  /* create a zero-filled array of the desired length. */
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  console.log('votes before', votes)
  const handleClickWithVotes = () => {
    console.log('votes', votes)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const handleClickWithSelected = () => {
    console.log('selected', selected)
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <Button text="vote" handleClick={handleClickWithVotes}/>
      <Button text="next anecdote" handleClick={handleClickWithSelected}/>
      <p>
        This anecdote has {votes[selected]} votes
      </p>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes} votes={votes}/>
    </div>
  )
}

export default App

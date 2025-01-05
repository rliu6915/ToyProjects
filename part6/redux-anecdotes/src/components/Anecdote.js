const Anecdote = ({ anecdote, handleOnClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} vote(s)
      </div>
      <button onClick={handleOnClick}>vote</button>
    </div>
  )
}

export default Anecdote
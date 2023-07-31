const Anecdote = ({ anecdote, handleOnClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleOnClick}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
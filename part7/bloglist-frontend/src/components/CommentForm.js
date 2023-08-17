
const CommentForm = () => {
  const addComment = (event) => {
    event.preventDefault()
    console.log('add comment')
  }

  return (
    <form onSubmit={addComment}>
      <input />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
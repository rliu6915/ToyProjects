

const Recommend = ({ show, books, user }) => {
  const favoriteGenre = user ? user.favoriteGenre : "no favorite genre"

  const filterByGenre = (books) => {
    return books.filter((b) => b.genres.includes(favoriteGenre))
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Recommendation</h2>
      <p>
        books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterByGenre(books).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
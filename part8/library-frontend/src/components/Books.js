import React, { useState } from "react"

const Books = (props) => {
  const [selectedGenre, setGenre] = useState("all books")

  const books = props.books
  // console.log("books", books)

  // filter books
  const filter = (books) => {
    if (selectedGenre === null || selectedGenre === "all books") {
      return books
    }
    return books.filter((book) => book.genres.includes(selectedGenre))
  }

  // get all genres
  const genres = props.getGenres(books)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        Genre: <strong>{selectedGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter(books).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        <button key="all books" onClick={() => setGenre("all books")}>all books</button>
      </div>
    </div>
  )
}

export default Books

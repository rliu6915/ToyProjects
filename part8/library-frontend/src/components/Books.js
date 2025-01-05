import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import { GET_BOOKS_BY_GENRE } from "../queries"

const Books = (props) => {
  const [selectedGenre, setGenre] = useState("all books")

  const books = props.books
  // console.log("books", books)

  // filter books
  // const filter = (books) => {
  //   if (selectedGenre === null || selectedGenre === "all books") {
  //     return books
  //   }
  //   return books.filter((book) => book.genres.includes(selectedGenre))
  // }

  const result = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: selectedGenre === "all books",
  })
  console.log("filterBooks", result.data)
  const filterBooks = result.data ? result.data.allBooks : books

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
          {filterBooks.map((a) => (
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

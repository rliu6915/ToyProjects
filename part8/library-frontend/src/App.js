import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`

// const CREATE_BOOK = gql`
//   mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
//     addBook(
//       title: $title
//       author: $author
//       published: $published
//       genres: $genres
//     ) {
//       title
//       author
//       published
//       genres
//       id
//     }
//   }
// `

const App = () => {
  const [page, setPage] = useState('authors')

  const result = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)

  if (result.loading || result2.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} auhtors={result.data.allAuthors}/>

      <Books show={page === 'books'} books={result2.data.allBooks}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App

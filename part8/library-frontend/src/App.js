import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'
import Notification from './components/Notification'

import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const getGenres = (books) => {
    const genres = books.map((book) => book.genres)
    const genresArr = genres.flat()
    const uniqueGenres = [...new Set(genresArr)]
    return uniqueGenres
  }

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  console.log("result", result.data)
  const result2 = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  console.log("result2", result2.data)
  const result3 = useQuery(ME, {
    pollInterval: 2000
  })
  console.log("result3", result3.data)

  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      console.log("data", data)
      window.alert(`New book added: ${data.data.bookAdded.title}`)
    }
  })

  if (result.loading || result2.loading || result3.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} auhtors={result.data.allAuthors}/>
        <Books show={page === 'books'} books={result2.data.allBooks} getGenres={getGenres}/>
        <Login show={page === 'login'} setToken={setToken} setError={notify} />
      </div>
    )
  }

  // console.log('page', page)

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors' || page === 'login' } auhtors={result.data.allAuthors}/>
      <Books show={page === 'books'} books={result2.data.allBooks} getGenres={getGenres}/>
      <Recommend show={page === 'recommend'} books={result2.data.allBooks} user={result3.data.me}/>
      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App

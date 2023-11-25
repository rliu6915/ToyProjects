import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  // console.log("result", result.data)
  const result2 = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  // console.log("result2", result2.data)

  if (result.loading || result2.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} auhtors={result.data.allAuthors}/>
        <Books show={page === 'books'} books={result2.data.allBooks}/>
        <Login show={page === 'login'} setToken={setToken} errorMessage={errorMessage} notify={notify} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('logout')}>logout</button>
      </div>

      <Authors show={page === 'authors'} auhtors={result.data.allAuthors}/>
      <Books show={page === 'books'} books={result2.data.allBooks}/>
      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App

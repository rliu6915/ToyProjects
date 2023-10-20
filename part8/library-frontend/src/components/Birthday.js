import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Birthday = () => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR) 

  const submit = (event) => {
    event.preventDefault()

    console.log('set birth year...')
    // console.log(name, born)

    editAuthor({
      variables: {
        name,
        setBornTo: Number(born)
      }
    })

    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({target}) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Birthday
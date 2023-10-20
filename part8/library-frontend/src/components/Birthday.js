import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

import Select from 'react-select';

const Birthday = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR) 

  // console.log('authors', authors)
  const options = authors.map((author) => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const submit = (event) => {
    event.preventDefault()

    console.log('set birth year...')
    // console.log(name, born)

    editAuthor({
      variables: {
        name: name.value,
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
          {/* <input
            value={name}
            onChange={({target}) => setName(target.value)}
          /> */}
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
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
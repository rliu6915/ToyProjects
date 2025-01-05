import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'

const BlogCreate = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='title'
            value={title}
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title'
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='author'
            value={author}
            name='author'
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='author'
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            value={url}
            name='url'
            onChange={(e) => setUrl(e.target.value)}
            placeholder='url'
          />
          <button id='create-button' type='submit'>
            create
          </button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogCreate
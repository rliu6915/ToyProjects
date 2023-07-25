import React, { useState } from 'react'

const BlogCreate = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    // console.log('title', title)
    // console.log('author', author)
    const blogObject = {
      // title: e.target.title.value,
      // author: e.target.author.value,
      // url: e.target.url.value,
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
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            value={title}
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title'
          />
        </div>
        <div>
            author:
          <input
            value={author}
            name='author'
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='author'
          />
        </div>
        <div>
            url:
          <input
            value={url}
            name='url'
            onChange={(e) => setUrl(e.target.value)}
            placeholder='url'
          />
        </div>
        <button type='submit'>
            create
        </button>
      </form>
    </div>
  )
}

export default BlogCreate
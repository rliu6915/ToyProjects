import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogCreate from './BlogCreate'
import userEvent from '@testing-library/user-event'

test('<BlogCreate /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogCreate createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  await user.type(inputTitle, 'testing a form...inputTitle')
  const inputAuthor = screen.getByPlaceholderText('author')
  await user.type(inputAuthor, 'testing a form...inputAuthor')
  const inputUrl = screen.getByPlaceholderText('url')
  await user.type(inputUrl, 'testing a form...inputUrl')
  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...inputTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form...inputAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form...inputUrl')
})
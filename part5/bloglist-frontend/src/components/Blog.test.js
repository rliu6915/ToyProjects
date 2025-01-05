import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import  userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders the blog title and author, but does not render its URL or number of likes by default', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.shortBlog')

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  expect(div).not.toHaveTextContent('url')
  expect(div).not.toHaveTextContent('0')

})

test('click on the button, the blog\'s URL and number of likes are shown', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.longBlog')

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('name')
  expect(div).toHaveTextContent('url')
  expect(div).toHaveTextContent('0')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name'
    }
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog
    blog={blog}
    hanldeLikeChange={mockHandler}
  />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = container.querySelector('.likeButton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
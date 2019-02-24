import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    username: 'user',
    id: 'asd'
  }

  const blog = {
    title: 'Some blog',
    author: 'Someone',
    url: 'https://www.some.blog',
    likes: 123,
    user: user
  }

  let component
  let addLikeMockHandler
  let removeBlogMockHandler
  beforeEach(() => {
    addLikeMockHandler = jest.fn()
    removeBlogMockHandler = jest.fn()
    component = render(
      <Blog user={user} blog={blog} addLike={addLikeMockHandler} removeBlog={removeBlogMockHandler} />
    )
  })

  describe('when collapsed', () => {
    test('renders title', () => {
      const div = component.container.querySelector('.title')
      expect(div).toHaveTextContent(blog.title)
    })
    test('renders author', () => {
      const div = component.container.querySelector('.title')
      expect(div).toHaveTextContent(blog.author)
    })
    test('does not render likes', () => {
      const div = component.container.querySelector('.title')
      expect(div).not.toHaveTextContent(blog.likes)
    })
    test('does not render url', () => {
      const div = component.container.querySelector('.title')
      expect(div).not.toHaveTextContent(blog.url)
    })
  })

  describe('when expanded', () => {
    test('renders title', () => { expect(component.container).toHaveTextContent(blog.title) })
    test('renders author', () => expect(component.container).toHaveTextContent(blog.author))
    test('renders likes', () => expect(component.container).toHaveTextContent(blog.likes))
    test('renders url', () => expect(component.container).toHaveTextContent(blog.url))
  })

  test('clicking like twice calls the event handler twice', async () => {
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLikeMockHandler.mock.calls.length).toBe(2)
  })

  test('clicking remove calls the event handler', async () => {
    const removeButton = component.getByText('Remove')
    global.confirm = () => true
    fireEvent.click(removeButton)

    expect(removeBlogMockHandler.mock.calls.length).toBe(1)
  })
})

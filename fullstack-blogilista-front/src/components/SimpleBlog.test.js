import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Some blog',
    author: 'Someone',
    likes: 123
  }


  let component
  let onClickMockHandler
  beforeEach(() => {
    onClickMockHandler = jest.fn()
    component = render(
      <SimpleBlog blog={blog} onClick={onClickMockHandler} />
    )
  })

  test('renders title', () => {expect(component.container).toHaveTextContent(blog.title)})
  test('renders author', () => expect(component.container).toHaveTextContent(blog.author))
  test('renders likes', () => expect(component.container).toHaveTextContent(blog.likes))

  test('clicking like twice calls the event handler twice', async () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(onClickMockHandler.mock.calls.length).toBe(2)
  })
})

import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  describe('when not logged in', () => {
    test('notes are not rendered', async () => {
      const component = render(
        <App />
      )

      await waitForElement(
        () => component.getByText('Login')
      )

      expect(component.container).toHaveTextContent('Login')
      expect(component.container).toHaveTextContent('Username')
      expect(component.container).toHaveTextContent('Password')
      expect(component.container).not.toHaveTextContent('blog')
      expect(component.container).not.toHaveTextContent('React Patterns')
    })
  })

  describe('when logged in', () => {
    const user = {
      id: 0,
      username: 'user',
      token: 'tokenxd'
    }

    test('blogs are rendered', async () => {
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))

      const component = render(
        <App />
      )

      await waitForElement(
        () => component.getByText('blogs')
      )

      expect(component.container).toHaveTextContent('Username')
      expect(component.container).toHaveTextContent('blogs')
      expect(component.container).toHaveTextContent('React patterns')
      expect(component.container).not.toHaveTextContent('Login')
      expect(component.container).not.toHaveTextContent('Password')
    })
  })
})

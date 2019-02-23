import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import CreateForm from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login'

const NOTIFICATION_TIMEOUT = 3000

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const loginFormRef = React.createRef()
  const createBlogFormRef = React.createRef()


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => { setBlogs(blogs) })
      .catch(error => { showNotification(`Error getting blogs: ${error.message}`, 'error') })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    if (notification) {
      clearTimeout(notification.timeoutID)
    }

    let timeoutID = setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT)
    setNotification({ message, type, timeoutID })
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      showNotification(`User '${username}' logged in`, 'ok')

      setUsername('')
      setPassword('')
      setUser(user)
    } catch (error) {
      showNotification('Invalid username or password', 'error')
    }
  }

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      createBlogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))

      showNotification(`Added a new blog: '${addedBlog.title}' by ${addedBlog.author}`, 'ok')
      return addedBlog
    } catch (error) {
      showNotification(`error creating blog: ${error.message}`, 'error')
    }
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogListUser')

    showNotification('User logged out', 'ok')
  }

  const addLike = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }

      const updatedBlog = await blogService.update(changedBlog)
      setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog))
    } catch (error) {
      showNotification(`Error adding like: ${error.message}`, 'error')
      // Blog is likely invalid in some way, remove it from list
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const removeBlog = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      await blogService.remove(blog)

      setBlogs(blogs.filter(b => b.id !== id))
    } catch (error) {
      showNotification(`Error removing blog: ${error.message}`, 'error')
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <Togglable buttonLabel="Login" ref={loginFormRef}>
        <LoginForm
          login={login}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} />
      </Togglable>
    </>
  )

  const userInfo = () => (
    <>
      <h2>Logged in as</h2>
      <div>Username: {user.username}</div>
      <button onClick={logout}>Logout </button>
    </>
  )

  const newBlogForm = () => (
    <>
      <h2>Add new blog</h2>
      <Togglable buttonLabel="Create new" ref={createBlogFormRef}>
        <CreateForm addBlog={addBlog} />
      </Togglable>
    </>
  )

  const notificationDisplay = () => (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )


  return (
    <div>
      {notification && notificationDisplay()}

      {user ? userInfo() : loginForm()}
      {user && newBlogForm()}

      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App

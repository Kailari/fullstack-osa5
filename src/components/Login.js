import React from 'react'

const LoginForm = ({ login, username, setUsername, password, setPassword }) => {
  

  const handleLogin = async (event) => {
    event.preventDefault()
    await login(username, password)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password
          <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm

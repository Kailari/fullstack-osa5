import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, username, password }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    await login()
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username <input name="Username" {...username} reset={undefined} />
      </div>
      <div>
        Password <input name="Password" {...password} reset={undefined} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm

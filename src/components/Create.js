import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    if (await addBlog({ title, author, url })) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleCreate}>
      Title: <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)} /><br />
      Author: <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)} /><br />
      URL: <input
        type="text"
        value={url}
        name="URL"
        onChange={({ target }) => setUrl(target.value)} /><br />
      <button type="submit">Create</button>
    </form>
  )
}

CreateForm.propTyes = {
  addBlog: PropTypes.func.isRequired,
}

export default CreateForm
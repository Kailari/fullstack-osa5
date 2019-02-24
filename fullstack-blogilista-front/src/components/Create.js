import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

const CreateForm = ({ addBlog }) => {
  const title = useField('')
  const author = useField('')
  const url = useField('')

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    if (await addBlog(newBlog)) {
      title.reset()
      author.reset()
      url.reset()
    }
  }

  return (
    <form onSubmit={handleCreate}>
      Title: <input name="Title" {...title} reset={undefined} /><br />
      Author: <input name="Author" {...author} reset={undefined} /><br />
      URL: <input name="URL" {...url} reset={undefined} /><br />
      <button type="submit">Create</button>
    </form>
  )
}

CreateForm.propTyes = {
  addBlog: PropTypes.func.isRequired,
}

export default CreateForm
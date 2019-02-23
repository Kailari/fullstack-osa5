import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ user, blog, addLike, removeBlog }, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    addLike(blog.id)
  }

  const remove = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const removeButton = () => <button onClick={remove}>Remove</button>

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div className="blog-entry">
      <span onClick={toggleVisibility}>{blog.title} by {blog.author}</span>
      <div style={showWhenVisible}>
        URL: <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a><br />
        Likes: {blog.likes} <button onClick={like}>Like</button><br />
        Added by {blog.user.username}<br />
        {user && user.id === blog.user.id && removeButton()}
      </div>
    </div>
  )
})

export default Blog
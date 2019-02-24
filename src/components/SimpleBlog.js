import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="simple-blog">
    <div className="title">
      {blog.title} {blog.author}
    </div>
    <div className="details">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog

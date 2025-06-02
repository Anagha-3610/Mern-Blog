import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!title || !content || !author) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const newBlog = { title, content, author };
      // The request will be proxied to http://localhost:5001/api/blogs
      const response = await axios.post('/api/blogs', newBlog);
      setMessage('Blog post added successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      // Optionally navigate to the blog list after adding
      // navigate('/');
      console.log('Blog added:', response.data);
    } catch (error) {
      setMessage('Failed to add blog post. ' + (error.response?.data?.msg || error.message));
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div>
      <h2>Add New Blog Post</h2>
      {message && <p style={{ color: message.startsWith('Failed') ? 'red' : 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;
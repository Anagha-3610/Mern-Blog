import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError('');
        // The request will be proxied to http://localhost:5001/api/blogs
        const response = await axios.get('/api/blogs');
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to fetch blogs. ' + (err.response?.data?.msg || err.message));
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>All Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts yet. Be the first to add one!</p>
      ) : (
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li key={blog._id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 200)}{blog.content.length > 200 ? '...' : ''}</p>
              <small>By: {blog.author}</small>
              <small style={{float: 'right'}}>Posted: {new Date(blog.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewBlogs;
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">View Blogs</Link>
        </li>
        <li>
          <Link to="/add">Add Blog</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
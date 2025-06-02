import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewBlogs from './components/ViewBlogs';
import AddBlog from './components/AddBlog';
import './index.css'; // Or App.css if you prefer

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ViewBlogs />} />
          <Route path="/add" element={<AddBlog />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
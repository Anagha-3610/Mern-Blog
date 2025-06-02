const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// @route   POST /api/blogs
// @desc    Add a new blog
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newBlog = new Blog({
      title,
      content,
      author,
    });

    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
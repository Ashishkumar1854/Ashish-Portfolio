// const Blog = require("../models/Blog");

// exports.getAllBlogs = async (req, res) => {
//   const blogs = await Blog.find().sort({ createdAt: -1 });
//   res.json(blogs);
// };

// exports.getBlogById = async (req, res) => {
//   const blog = await Blog.findById(req.params.id);
//   if (!blog) return res.status(404).json({ message: "Blog not found" });
//   res.json(blog);
// };

// exports.addBlog = async (req, res) => {
//   const { title, content, image, excerpt } = req.body;
//   const blog = new Blog({ title, content, image, excerpt });
//   await blog.save();
//   res.status(201).json(blog);
// };

// exports.deleteBlog = async (req, res) => {
//   await Blog.findByIdAndDelete(req.params.id);
//   res.json({ message: "Blog deleted" });
// };

const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const { title, content, image, excerpt, author } = req.body;
    const blog = new Blog({
      title,
      content,
      image,
      excerpt,
      author: author || "Admin", // fallback if not provided
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

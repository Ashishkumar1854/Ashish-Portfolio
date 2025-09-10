//📁 backend/controllers/blogController.js
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Share = require("../models/Share");
const Coin = require("../models/Coin");

// ✅ Create Blog (Admin Only)
exports.createBlog = async (req, res) => {
  try {
    const { title, content, coverImage } = req.body;
    const blog = await Blog.create({
      title,
      content,
      coverImage,
      author: req.user._id,
    });
    res.status(201).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

// ✅ Get All Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author", "name email");
    res.json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

// ✅ Get Single Blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name" },
      });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};

// ✅ Delete Blog (Admin Only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

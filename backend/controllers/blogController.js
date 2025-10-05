//📁 backend/controllers/blogController.js

const Blog = require("../models/Blog");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");

// Configure Cloudinary (Existing config retained)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Create Blog (Admin only)
exports.createBlog = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const tempPath = `tmp-${Date.now()}.jpg`;
      fs.writeFileSync(tempPath, req.file.buffer);
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "blogs",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(tempPath);
    }

    const { title, subtitle, content } = req.body;
    const blog = await Blog.create({
      title,
      subtitle,
      content,
      image: imageUrl,
      author: req.user.name,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Blog creation failed",
      error: error.message,
    });
  }
};

// ✅ Get Blogs with pagination + search
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 6, search = "" } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      blogs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

// ✅ Get Single Blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

// ✅ Update Blog (Admin only)
exports.updateBlog = async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      const tempPath = `tmp-${Date.now()}.jpg`;
      fs.writeFileSync(tempPath, req.file.buffer);
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "blogs",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(tempPath);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

// ✅ Delete Blog (Admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};

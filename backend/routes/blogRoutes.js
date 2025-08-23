const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  addBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { adminAuth } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", adminAuth, addBlog);
router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;

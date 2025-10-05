//routes/blogRoutes.js

// const express = require("express");
// const router = express.Router();
// const {
//   createBlog,
//   getBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// } = require("../controllers/blogController");
// const { protect, adminAuth } = require("../middleware/authMiddleware");

// // 🟢 Public
// router.get("/", getBlogs);
// router.get("/:id", getBlogById);

// // 🔒 Admin only
// router.post("/", protect, adminAuth, createBlog);
// router.put("/:id", protect, adminAuth, updateBlog);
// router.delete("/:id", protect, adminAuth, deleteBlog);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, adminAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🟢 Public
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// 🔒 Admin only with image upload
router.post("/", protect, adminAuth, upload.single("image"), createBlog);
router.put("/:id", protect, adminAuth, upload.single("image"), updateBlog);
router.delete("/:id", protect, adminAuth, deleteBlog);

module.exports = router;

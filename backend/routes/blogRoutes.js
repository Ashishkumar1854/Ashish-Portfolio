const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const likeController = require("../controllers/likeController");
const shareController = require("../controllers/shareController");

// Blog CRUD
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.post("/", protect, admin, blogController.createBlog);
router.put("/:id", protect, admin, blogController.updateBlog);
router.delete("/:id", protect, admin, blogController.deleteBlog);
router.patch("/:id/verify", protect, admin, blogController.verifyBlog);

// Likes
router.post("/:id/like", protect, likeController.toggleLike);

// Comments
router.get("/:id/comments", commentController.getComments);
router.post("/:id/comments", protect, commentController.addComment);
router.delete("/comments/:commentId", protect, commentController.deleteComment);

// Shares
router.post("/:id/share", protect, shareController.addShare);

module.exports = router;

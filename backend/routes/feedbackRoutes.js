// backend/routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getFeedbacks,
  deleteFeedback,
} = require("../controllers/feedbackController");
const { adminAuth } = require("../middleware/authMiddleware");

// public - submit feedback
router.post("/", createFeedback);

// public - get all feedbacks (so users can read them)
router.get("/", getFeedbacks);

// admin - delete a feedback
router.delete("/:id", adminAuth, deleteFeedback);

module.exports = router;

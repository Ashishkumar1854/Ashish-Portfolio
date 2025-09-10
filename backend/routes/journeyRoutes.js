// 1.3 routes/journeyRoutes.js
const express = require("express");
const router = express.Router();
const {
  getJourneys,
  createJourney,
  updateJourney,
  deleteJourney,
} = require("../controllers/journeyController");

// ✅ Admin authentication middleware
const { adminAuth } = require("../middleware/authMiddleware");

// 🌐 Public route: get all journeys
router.get("/", getJourneys);

// 🔒 Admin-only routes
router.post("/", adminAuth, createJourney);
router.put("/:id", adminAuth, updateJourney);
router.delete("/:id", adminAuth, deleteJourney);

module.exports = router;

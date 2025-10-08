// backend/routes/assistantRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllQA,
  addQA,
  updateQA,
  deleteQA,
} = require("../controllers/assistantController");

// Public route for assistant frontend
router.get("/", getAllQA);

// Admin routes
router.post("/", addQA);
router.put("/:id", updateQA);
router.delete("/:id", deleteQA);

module.exports = router;

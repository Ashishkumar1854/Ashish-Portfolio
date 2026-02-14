//routes/adminHireRoutes.js

const express = require("express");
const router = express.Router();
const {
  getPendingHires,
  confirmHire,
  verifyHire,
} = require("../controllers/adminHireController");
const { protect, adminAuth } = require("../middleware/authMiddleware");

// ✅ All admin routes protected
router.get("/hires", protect, adminAuth, getPendingHires);
router.post("/hires/:id/confirm", protect, adminAuth, confirmHire);
router.put("/hire/:id/verify", protect, adminAuth, verifyHire);

module.exports = router;

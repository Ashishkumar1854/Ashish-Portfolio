//File: backend/routes/adminRoutes.js (new file)

const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/adminDashboardController");
const { protectAdmin } = require("../middleware/authMiddleware"); // ✅ now correctly points to adminAuth

router.get("/dashboard", protectAdmin, getDashboardData);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getVision, updateVision } = require("../controllers/visionController");

// ✅ Get Vision Data
router.get("/", getVision);

// ✅ Update Vision Data
router.post("/", updateVision);

module.exports = router;

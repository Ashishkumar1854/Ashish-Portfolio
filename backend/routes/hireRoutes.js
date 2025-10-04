//routes/hireRoutes.js

const express = require("express");
const router = express.Router();
const { createHireRequest } = require("../controllers/hireController");
const multer = require("multer");

// ✅ Multer setup for file upload
const upload = multer({ dest: "uploads/" });

router.post("/hire", upload.single("document"), createHireRequest);

module.exports = router;

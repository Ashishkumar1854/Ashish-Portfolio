// routes/pageARoutes.js
const express = require("express");
const router = express.Router();
const { getPageA, savePageA } = require("../controllers/pageAController");

router.get("/", getPageA);
router.post("/", savePageA);

module.exports = router;

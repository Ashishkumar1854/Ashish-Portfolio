const express = require("express");
const router = express.Router();
const { getPageD, savePageD } = require("../controllers/pageDController");

router.get("/", getPageD);
router.post("/", savePageD);

module.exports = router;

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Routes
router.get("/:section", homeController.getSection);
router.post("/", homeController.saveSection);
router.delete("/:section", homeController.deleteSection);

module.exports = router;

// routes/skillsRoutes.js
const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skillsController");

// GET all skills
router.get("/", skillsController.getSkills);

// POST add new skill
router.post("/", skillsController.addSkill);

// PUT update skill
router.put("/", skillsController.updateSkill);

// DELETE skill
router.delete("/", skillsController.deleteSkill);

module.exports = router;

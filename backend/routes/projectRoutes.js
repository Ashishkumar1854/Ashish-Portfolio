const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", addProject); // no JWT, email-based admin
router.delete("/:id", deleteProject);

module.exports = router;

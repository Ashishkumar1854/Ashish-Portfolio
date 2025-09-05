// //backend/routes/projectRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   getProjects,
//   addProject,
//   deleteProject,
// } = require("../controllers/projectController");

// router.get("/", getProjects);
// router.post("/", addProject); // no JWT, email-based admin
// router.delete("/:id", deleteProject);

// module.exports = router;

//05/09
// backend/routes/projectRoutes.js
// // routes/projectRoutes.js
// const express = require("express");
// const router = express.Router();
// const Project = require("../models/Project");

// // GET all projects
// router.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // POST new project (optional, admin only)
// router.post("/", async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       techStack,
//       githubLink,
//       liveDemoLink,
//       category,
//     } = req.body;
//     const project = new Project({
//       title,
//       description,
//       techStack,
//       githubLink,
//       liveDemoLink,
//       category,
//     });
//     await project.save();
//     res.status(201).json(project);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create project" });
//   }
// });

// // DELETE a project by ID (admin only)
// router.delete("/:id", async (req, res) => {
//   try {
//     // Optional: Check if user is admin (requires auth middleware)
//     if (req.user.role !== "admin")
//       return res.status(403).json({ message: "Unauthorized" });

//     // Find and delete the project
//     const project = await Project.findByIdAndDelete(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     res.json({ message: "Project deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete project" });
//   }
// });

// module.exports = router;

// backend/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { protect, adminAuth } = require("../middleware/authMiddleware");

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// POST a new project (admin only)
router.post("/", adminAuth, async (req, res) => {
  const { title, description, techStack, githubLink, liveDemoLink, category } =
    req.body;

  if (!title || !description || !githubLink) {
    return res
      .status(400)
      .json({ message: "Title, description, and GitHub link are required" });
  }

  try {
    const newProject = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveDemoLink,
      category,
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add project" });
  }
});

// DELETE a project by ID (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

module.exports = router;

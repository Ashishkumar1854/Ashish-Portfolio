const Project = require("../models/Project");

// Get all projects → Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// Add project → Admin only (email-based)
const addProject = async (req, res) => {
  try {
    const { email, title, description, techStack, githubLink, liveDemoLink } =
      req.body;

    // Admin check
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Not authorized, admin only" });
    }

    if (!title || !description || !githubLink) {
      return res
        .status(400)
        .json({ message: "Title, description, GitHub link required" });
    }

    const newProject = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveDemoLink,
    });
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Failed to add project:", err);
    res.status(500).json({ message: "Failed to add project" });
  }
};

// Delete project → Admin only (email-based)
const deleteProject = async (req, res) => {
  try {
    const { email } = req.body; // Admin email from frontend
    const { id } = req.params;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Not authorized, admin only" });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Failed to delete project:", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

module.exports = { getProjects, addProject, deleteProject };

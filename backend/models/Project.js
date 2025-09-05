//21/08/2025
// //backend/models/Project.js
// const mongoose = require("mongoose");

// const ProjectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   techStack: [{ type: String }], // Example: ["React", "Node", "MongoDB"]
//   githubLink: { type: String, required: true },
//   liveDemoLink: { type: String }, // Optional
//   category: { type: String }, // Optional: "Web", "ML", etc.
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Project", ProjectSchema);

//05/09
// backend/models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }], // Example: ["React", "Node", "MongoDB"]
  githubLink: { type: String, required: true },
  liveDemoLink: { type: String }, // Optional
  category: { type: String }, // Optional: "Web", "ML", etc.
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);

import React, { useState } from "react";
import ProjectForm from "../../components/admin/ProjectForm";

// Dummy projects (for frontend preview)
const dummyProjects = [
  {
    title: "Voting System",
    description: "A secure voting app with face recognition.",
    github: "https://github.com/ashish/voting-system",
    live: "https://votingsystem.live",
  },
  {
    title: "Color Picker App",
    description: "Pick colors in real time using OpenCV + React.",
    github: "https://github.com/ashish/color-picker",
    live: "https://colorpicker.live",
  },
];

const ProjectManager = () => {
  const [projects, setProjects] = useState(dummyProjects);

  // Add new project (temporary - later from DB)
  const handleAddProject = (project) => {
    setProjects([project, ...projects]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        📊 Manage Projects
      </h2>

      {/* Add Form */}
      <ProjectForm onAdd={handleAddProject} />

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {proj.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{proj.description}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
              <a
                href={proj.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;

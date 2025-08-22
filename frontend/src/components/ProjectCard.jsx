import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project, onDelete, isAdmin }) => {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {project.description}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-gray-800 dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition"
            >
              GitHub
            </a>
          )}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-500 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      {isAdmin && (
        <button
          onClick={() => onDelete(project._id)}
          className="mt-4 w-full bg-red-600 text-white py-1 rounded hover:bg-red-500 transition"
        >
          Delete
        </button>
      )}
    </motion.div>
  );
};

export default ProjectCard;

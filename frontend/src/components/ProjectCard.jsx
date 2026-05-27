import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project, index, onDelete, isAdmin }) => {
  const [deleting, setDeleting] = useState(false);
  if (!project) return null;

  const isOdd = index % 2 !== 0;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(project._id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group glass-card overflow-hidden flex flex-col ${isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-auto lg:h-[480px] rounded-[24px]`}
    >
      {}
      <div className="relative w-full lg:w-7/12 h-64 lg:h-full overflow-hidden bg-surface-elevated">
        {}
        <div 
          className={`absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transform transition-all duration-700 group-hover:scale-105 ${!project.imageUrl ? 'hidden' : ''}`}
          style={{ backgroundImage: `url(${project.imageUrl || ''})` }}
        />
        
        {}
        {!project.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
             <span className="label-caps text-text-dim tracking-widest text-xl">PROJECT VISUAL</span>
          </div>
        )}
        
        {}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/20 to-transparent opacity-80" />

        {}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <a href={project.liveDemoLink || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full whitespace-nowrap px-8 shadow-lg shadow-primary/20">
            VIEW CASE STUDY →
          </a>
        </div>
      </div>

      {}
      <div className="w-full lg:w-5/12 p-8 lg:p-card-padding flex flex-col justify-center">
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="label-caps text-primary border border-border-subtle bg-surface-deep px-3 py-1.5 rounded-full text-[10px]">
                {tech}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-headline-md text-on-surface mb-6">
          {project.title || "Untitled Project"}
        </h3>

        <div className="label-caps text-text-dim mb-3">THE PROBLEM</div>
        <p className="text-body-md text-text-dim flex-1">
          {project.description || "No description available."}
        </p>

        <div className="flex items-center gap-4 mt-8">
          {project.liveDemoLink && (
             <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="btn-ghost rounded py-2 px-6">
               View Project →
             </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-on-surface transition-colors p-2" aria-label="GitHub Repository">
              <FaGithub size={24} />
            </a>
          )}
        </div>

        {isAdmin && (
          <div className="mt-8 pt-4 border-t border-border-subtle">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`label-caps px-4 py-2 rounded transition ${
                deleting
                  ? "bg-surface-elevated text-text-dim cursor-not-allowed"
                  : "text-error border border-error/50 hover:bg-error/10 hover:border-error"
              }`}
            >
              {deleting ? "DELETING..." : "DELETE PROJECT"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;

import React, { useState } from "react";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectSection from "../components/ProjectSection";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Project = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [updateTrigger, setUpdateTrigger] = useState(false);

  return (
    <div className="pt-32 pb-section-gap-lg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-16 text-center"
      >
        <div className="label-caps text-primary mb-4">PORTFOLIO</div>
        <h1 className="text-headline-lg text-on-surface">Featured Projects</h1>
      </motion.div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {isAdmin && (
          <div className="mb-12 glass-card p-6 rounded-xl max-w-2xl mx-auto">
            <ProjectForm onAdd={() => setUpdateTrigger((prev) => !prev)} />
          </div>
        )}
        <ProjectSection updateTrigger={updateTrigger} />
      </div>
    </div>
  );
};

export default Project;

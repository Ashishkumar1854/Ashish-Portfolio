// frontend/src/pages/Project.jsx
import React, { useState } from "react";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectSection from "../components/ProjectSection";
import { useAuth } from "../context/AuthContext";

const Project = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [updateTrigger, setUpdateTrigger] = useState(false);

  return (
    <div className="p-6">
      {isAdmin && (
        <ProjectForm onAdd={() => setUpdateTrigger((prev) => !prev)} />
      )}
      <ProjectSection updateTrigger={updateTrigger} />
    </div>
  );
};

export default Project;

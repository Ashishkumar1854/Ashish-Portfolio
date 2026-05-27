import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

const ProjectSection = ({ updateTrigger }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/api/projects");
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Unable to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [updateTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await API.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting project. Try again.");
    }
  };

  if (loading)
    return <p className="text-center label-caps text-text-dim py-12">Loading projects...</p>;
  if (error) return <p className="text-center label-caps text-error py-12">{error}</p>;
  if (projects.length === 0)
    return <p className="text-center label-caps text-text-dim py-12">No projects to show.</p>;

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {projects.map((p, index) => (
        <ProjectCard
          key={p._id}
          project={p}
          index={index}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ProjectSection;

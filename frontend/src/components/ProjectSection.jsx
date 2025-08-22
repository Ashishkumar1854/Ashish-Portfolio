// import React, { useEffect, useState } from "react";
// import ProjectCard from "./ProjectCard";
// import { useAuth } from "../context/AuthContext";

// const ProjectSection = () => {
//   const [projects, setProjects] = useState([]);
//   const { user } = useAuth();
//   const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL;

//   // Fetch projects
//   const fetchProjects = async () => {
//     try {
//       const res = await fetch("http://localhost:5001/api/projects");
//       const data = await res.json();
//       setProjects(data);
//     } catch (err) {
//       console.error("Failed to fetch projects:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Delete project
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       const res = await fetch(`http://localhost:5001/api/projects/${id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: user?.email }),
//       });
//       const result = await res.json().catch(() => ({}));
//       if (!res.ok) alert(result.message || "Failed to delete");

//       setProjects(projects.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   return (
//     <div className="grid gap-4">
//       {projects.map((p) => (
//         <ProjectCard
//           key={p._id}
//           project={p}
//           onDelete={handleDelete}
//           isAdmin={isAdmin}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProjectSection;

import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useAuth } from "../context/AuthContext";

const ProjectSection = ({ updateTrigger }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL;

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [updateTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) return alert(result.message || "Failed to delete");
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="grid gap-4">
      {projects.map((p) => (
        <ProjectCard
          key={p._id}
          project={p}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ProjectSection;

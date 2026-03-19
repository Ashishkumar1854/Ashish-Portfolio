// // frontend/src/components/admin/ProjectForm.jsx
// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// const ProjectForm = ({ onAdd }) => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     githubLink: "",
//     liveDemoLink: "",
//     techStack: "", // comma-separated from input, optional
//   });

//   const { user } = useAuth(); // ensure auth context available

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // optional: convert techStack string to array
//     const techStackArray = form.techStack
//       ? form.techStack
//           .split(",")
//           .map((t) => t.trim())
//           .filter(Boolean)
//       : [];

//     try {
//       const res = await fetch("http://localhost:5001/api/projects", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // important - send cookie so backend can identify req.user
//         body: JSON.stringify({
//           title: form.title,
//           description: form.description,
//           githubLink: form.githubLink,
//           liveDemoLink: form.liveDemoLink,
//           techStack: techStackArray,
//         }),
//       });

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) return alert(data.message || "Failed to add project");
//       onAdd(); // parent triggers re-fetch or update
//       setForm({
//         title: "",
//         description: "",
//         githubLink: "",
//         liveDemoLink: "",
//         techStack: "",
//       });
//     } catch (err) {
//       console.error("Add project failed:", err);
//     }
//   };

//   // If user isn't admin, hide the form (safety)
//   if (user?.role !== "admin") return null;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-md mb-6"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Project Title"
//           value={form.title}
//           onChange={handleChange}
//           className="p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           name="githubLink"
//           placeholder="GitHub Link"
//           value={form.githubLink}
//           onChange={handleChange}
//           className="p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           name="liveDemoLink"
//           placeholder="Live URL"
//           value={form.liveDemoLink}
//           onChange={handleChange}
//           className="p-2 border rounded-md"
//         />
//         <input
//           type="text"
//           name="techStack"
//           placeholder="Tech Stack (comma separated, e.g. React,Node)"
//           value={form.techStack}
//           onChange={handleChange}
//           className="p-2 border rounded-md col-span-1 md:col-span-2"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="p-2 border rounded-md col-span-1 md:col-span-2"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="mt-4 bg-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300"
//       >
//         ➕ Add Project
//       </button>
//     </form>
//   );
// };

// export default ProjectForm;

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api"; // ✅ unified API

const ProjectForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveDemoLink: "",
    techStack: "", // comma-separated from input
  });

  const { user } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techStackArray = form.techStack
      ? form.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    try {
      await API.post("/api/projects", {
        title: form.title,
        description: form.description,
        githubLink: form.githubLink,
        liveDemoLink: form.liveDemoLink,
        techStack: techStackArray,
      });

      onAdd(); // parent triggers re-fetch or update
      setForm({
        title: "",
        description: "",
        githubLink: "",
        liveDemoLink: "",
        techStack: "",
      });
    } catch (err) {
      console.error("Add project failed:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to add project");
    }
  };

  // Only admins can see the form
  if (user?.role !== "admin") return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={handleChange}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="liveDemoLink"
          placeholder="Live URL"
          value={form.liveDemoLink}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated, e.g. React,Node)"
          value={form.techStack}
          onChange={handleChange}
          className="p-2 border rounded-md col-span-1 md:col-span-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded-md col-span-1 md:col-span-2"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300"
      >
        ➕ Add Project
      </button>
    </form>
  );
};

export default ProjectForm;

// import React, { useState } from "react";

// const ProjectForm = ({ user, onAdd }) => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     githubLink: "",
//     liveDemoLink: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5001/api/projects", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, email: user?.email }),
//       });

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) return alert(data.message || "Failed to add project");

//       onAdd(data); // Update parent
//       setForm({ title: "", description: "", githubLink: "", liveDemoLink: "" });
//     } catch (err) {
//       console.error("Add project failed:", err);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-4 bg-yellow-50 rounded shadow-md"
//     >
//       <input
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//         placeholder="Title"
//         required
//       />
//       <input
//         name="githubLink"
//         value={form.githubLink}
//         onChange={handleChange}
//         placeholder="GitHub Link"
//         required
//       />
//       <input
//         name="liveDemoLink"
//         value={form.liveDemoLink}
//         onChange={handleChange}
//         placeholder="Live URL"
//       />
//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         placeholder="Description"
//         required
//       />
//       <button type="submit">➕ Add Project</button>
//     </form>
//   );
// };

// export default ProjectForm;

import React, { useState } from "react";

const ProjectForm = ({ user, onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveDemoLink: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: user?.email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return alert(data.message || "Failed to add project");
      onAdd(); // trigger parent re-fetch
      setForm({ title: "", description: "", githubLink: "", liveDemoLink: "" });
    } catch (err) {
      console.error("Add project failed:", err);
    }
  };

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

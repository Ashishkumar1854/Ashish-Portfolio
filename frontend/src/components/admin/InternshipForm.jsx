import React, { useState } from "react";

const InternshipForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    company: initialData.company || "",
    duration: initialData.duration || "",
    description: initialData.description || "",
    link: initialData.link || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      company: "",
      duration: "",
      description: "",
      link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Internship Title"
        value={form.title}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g. Jan–Apr 2024)"
        value={form.duration}
        onChange={handleChange}
        className="input-field"
        required
      />
      <textarea
        name="description"
        placeholder="Internship Description"
        value={form.description}
        onChange={handleChange}
        className="input-field"
        rows={3}
        required
      />
      <input
        type="url"
        name="link"
        placeholder="Reference Link (optional)"
        value={form.link}
        onChange={handleChange}
        className="input-field"
      />

      <button
        type="submit"
        className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300"
      >
        Save Internship
      </button>
    </form>
  );
};

export default InternshipForm;

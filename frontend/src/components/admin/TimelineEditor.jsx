import React, { useState } from "react";

const TimelineEditor = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    year: initialData.year || "",
    title: initialData.title || "",
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ year: "", title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="year"
        placeholder="Year (e.g. 2023)"
        value={form.year}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="input-field"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="input-field"
        rows={3}
        required
      />
      <button
        type="submit"
        className="bg-yellow-400 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-300"
      >
        Add Timeline Entry
      </button>
    </form>
  );
};

export default TimelineEditor;

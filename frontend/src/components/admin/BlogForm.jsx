import React, { useState } from "react";

const BlogForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    author: initialData.author || "",
    date: initialData.date || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", content: "", author: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={form.title}
        onChange={handleChange}
        className="input-field"
        required
      />
      <textarea
        name="content"
        placeholder="Write your blog post..."
        value={form.content}
        onChange={handleChange}
        className="input-field"
        rows={5}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="input-field"
        required
      />

      <button
        type="submit"
        className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300"
      >
        Publish Blog
      </button>
    </form>
  );
};

export default BlogForm;

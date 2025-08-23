import React, { useState } from "react";

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }
    onSubmit({ title, content, author });
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-xl font-semibold text-gray-800">✍️ Add New Blog</h3>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <textarea
        placeholder="Write your blog content..."
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        Publish 🚀
      </button>
    </form>
  );
};

export default BlogForm;

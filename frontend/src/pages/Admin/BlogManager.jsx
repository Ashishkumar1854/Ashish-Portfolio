import React, { useState } from "react";
import BlogForm from "../../components/admin/BlogForm";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);

  const handleAddBlog = (newBlog) => {
    setBlogs((prev) => [...prev, newBlog]);
    // TODO: Connect to MongoDB API later
    console.log("📘 New Blog:", newBlog);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✍️ Manage Blogs</h2>

      <BlogForm onSubmit={handleAddBlog} />

      <div className="mt-8 space-y-6">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded shadow bg-white"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              <span>🧑‍💻 {blog.author}</span> | <span>📅 {blog.date}</span>
            </p>
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;

import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogForm from "../components/admin/BlogForm";
import { motion } from "framer-motion";

// ✅ Backend ka base URL env se lo
const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const Blog = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  // ✅ Backend se blogs fetch karna
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blog`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ New blog add karne ka handler (sirf admin ke liye)
  const handleAddBlog = async (newBlog) => {
    try {
      const res = await fetch(`${API_BASE}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // admin token
        },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) throw new Error("Failed to add blog");
      const data = await res.json();
      setBlogs([data, ...blogs]);
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  // ✅ Blog delete handler (sirf admin ke liye)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 🌟 Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          🌍 Tech Insights & Stories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover{" "}
          <span className="font-semibold text-yellow-500">
            Development, AI/ML, and Startup
          </span>{" "}
          blogs from real projects and experiences. Stay ahead with our curated
          learnings.
        </p>
      </motion.div>

      {/* ✅ Admin only BlogForm */}
      {user?.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <BlogForm onSubmit={handleAddBlog} />
        </motion.div>
      )}

      {/* 📚 Blog List */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Latest Blogs
      </h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">
          No blogs yet. Check back soon!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <BlogCard
                {...blog}
                onDelete={
                  user?.role === "admin" ? () => handleDelete(blog._id) : null
                }
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;

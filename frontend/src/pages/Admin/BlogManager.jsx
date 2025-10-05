// // src/pages/Admin/BlogManager.jsx

// // src/pages/Admin/BlogManager.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const API_BASE = process.env.REACT_APP_BACKEND_URL;

// const BlogManager = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     subtitle: "",
//     content: "",
//     image: "",
//   });

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/blogs`);
//       setBlogs(res.data.blogs);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE}/api/blogs`, form, {
//         withCredentials: true,
//       });
//       setForm({ title: "", subtitle: "", content: "", image: "" });
//       fetchBlogs();
//     } catch (error) {
//       console.error("Error creating blog:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/api/blogs/${id}`, {
//         withCredentials: true,
//       });
//       fetchBlogs();
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">📝 Blog Manager</h1>

//       {/* Blog Form */}
//       <form onSubmit={handleSubmit} className="mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <ReactQuill
//           theme="snow"
//           value={form.content}
//           onChange={(val) => setForm({ ...form, content: val })}
//           className="mb-3"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Publish Blog
//         </button>
//       </form>

//       {/* Blog List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {blogs.map((blog) => (
//           <div key={blog._id} className="p-4 border rounded shadow">
//             <h2 className="text-xl font-bold">{blog.title}</h2>
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: blog.content.substring(0, 100) + "...",
//               }}
//             />
//             <button
//               onClick={() => handleDelete(blog._id)}
//               className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogManager;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const BlogManager = ({ fetchBlogs }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch blogs
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/blogs?page=1&limit=100`);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error loading blogs:", err.response?.data || err.message);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Create / update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    if (image) formData.append("image", image); // Multer will handle

    try {
      if (editingId) {
        await axios.put(`${backendUrl}/api/blogs/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Blog updated successfully!");
      } else {
        await axios.post(`${backendUrl}/api/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Blog created successfully!");
      }

      setTitle("");
      setSubtitle("");
      setContent("");
      setImage(null);
      setEditingId(null);
      loadBlogs();
      fetchBlogs?.();
    } catch (err) {
      console.error("Error saving blog:", err.response?.data || err.message);
      toast.error("Failed to save blog");
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setSubtitle(blog.subtitle || "");
    setContent(blog.content);
    setEditingId(blog._id);
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${backendUrl}/api/blogs/${id}`, {
        withCredentials: true,
      });
      toast.success("Blog deleted!");
      loadBlogs();
      fetchBlogs?.();
    } catch (err) {
      console.error("Error deleting blog:", err.response?.data || err.message);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {editingId ? "Edit Blog" : "Add New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4 text-gray-700">All Blogs</h3>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font-bold text-lg">{blog.title}</h4>
              {blog.subtitle && (
                <p className="text-gray-500 mb-2">{blog.subtitle}</p>
              )}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;

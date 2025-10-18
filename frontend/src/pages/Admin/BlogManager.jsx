// // // src/pages/Admin/BlogManager.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";

// const BlogManager = ({ fetchBlogs }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   // Fetch blogs
//   const loadBlogs = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${backendUrl}/api/blogs?page=1&limit=100`);
//       setBlogs(res.data.blogs);
//     } catch (err) {
//       console.error("Error loading blogs:", err.response?.data || err.message);
//       toast.error("Failed to load blogs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBlogs();
//   }, []);

//   // Create / update blog
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     formData.append("content", content);
//     if (image) formData.append("image", image); // Multer will handle

//     try {
//       if (editingId) {
//         await axios.put(`${backendUrl}/api/blogs/${editingId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         });
//         toast.success("Blog updated successfully!");
//       } else {
//         await axios.post(`${backendUrl}/api/blogs`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         });
//         toast.success("Blog created successfully!");
//       }

//       setTitle("");
//       setSubtitle("");
//       setContent("");
//       setImage(null);
//       setEditingId(null);
//       loadBlogs();
//       fetchBlogs?.();
//     } catch (err) {
//       console.error("Error saving blog:", err.response?.data || err.message);
//       toast.error("Failed to save blog");
//     }
//   };

//   // Edit blog
//   const handleEdit = (blog) => {
//     setTitle(blog.title);
//     setSubtitle(blog.subtitle || "");
//     setContent(blog.content);
//     setEditingId(blog._id);
//   };

//   // Delete blog
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`${backendUrl}/api/blogs/${id}`, {
//         withCredentials: true,
//       });
//       toast.success("Blog deleted!");
//       loadBlogs();
//       fetchBlogs?.();
//     } catch (err) {
//       console.error("Error deleting blog:", err.response?.data || err.message);
//       toast.error("Failed to delete blog");
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-12 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-blue-700 mb-4">
//         {editingId ? "Edit Blog" : "Add New Blog"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Subtitle</label>
//           <input
//             type="text"
//             value={subtitle}
//             onChange={(e) => setSubtitle(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Content</label>
//           <ReactQuill value={content} onChange={setContent} />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
//         >
//           {editingId ? "Update Blog" : "Create Blog"}
//         </button>
//       </form>

//       <h3 className="text-xl font-bold mb-4 text-gray-700">All Blogs</h3>
//       {loading ? (
//         <p>Loading blogs...</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
//             >
//               {blog.image && (
//                 <img
//                   src={blog.image}
//                   alt={blog.title}
//                   className="h-40 w-full object-cover rounded-lg mb-2"
//                 />
//               )}
//               <h4 className="font-bold text-lg">{blog.title}</h4>
//               {blog.subtitle && (
//                 <p className="text-gray-500 mb-2">{blog.subtitle}</p>
//               )}
//               <div className="flex justify-between items-center mt-2">
//                 <button
//                   onClick={() => handleEdit(blog)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(blog._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogManager;

// src/pages/Admin/BlogManager.jsx
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import API from "../../utils/api"; // ✅ centralized API

const BlogManager = ({ fetchBlogs }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch blogs
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/blogs?page=1&limit=100");
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
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await API.put(`/api/blogs/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog updated successfully!");
      } else {
        await API.post("/api/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
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
      await API.delete(`/api/blogs/${id}`);
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

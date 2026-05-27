



















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

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setSubtitle(blog.subtitle || "");
    setContent(blog.content);
    setEditingId(blog._id);
  };

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
    <div className="glass-card p-6 rounded-xl mb-12 max-w-6xl mx-auto text-on-surface">
      <h2 className="text-2xl font-bold text-primary mb-4">
        {editingId ? "Edit Blog" : "Add New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1 text-text-dim label-caps">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-surface-deep border border-border-subtle rounded-lg px-4 py-3 focus:border-primary outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-text-dim label-caps">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-surface-deep border border-border-subtle rounded-lg px-4 py-3 focus:border-primary outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-text-dim label-caps">Content</label>
          <div className="bg-surface-elevated text-on-surface rounded-lg overflow-hidden border border-border-subtle">
            <ReactQuill value={content} onChange={setContent} theme="snow" className="h-64 mb-12" />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-text-dim label-caps">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-text-dim file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-surface-elevated file:text-primary hover:file:bg-white/10"
          />
        </div>

        <button
          type="submit"
          className="btn-primary px-6 py-2 rounded-lg font-semibold"
        >
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4 text-on-surface">All Blogs</h3>
      {loading ? (
        <p className="text-text-dim label-caps">Loading blogs...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-surface-elevated border border-border-subtle rounded-xl p-4 hover:border-primary transition-colors"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font-bold text-lg text-on-surface">{blog.title}</h4>
              {blog.subtitle && (
                <p className="text-text-dim mb-2 text-sm">{blog.subtitle}</p>
              )}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-3 py-1 rounded hover:bg-tertiary/20 text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-error/10 text-error border border-error/20 px-3 py-1 rounded hover:bg-error/20 text-sm font-medium transition-colors"
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

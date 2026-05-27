






import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api"; // ✅ centralized API

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error loading blog:", err.response?.data || err.message);
        toast.error("Failed to load blog");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <p className="text-center mt-20 text-gray-500 font-medium">Loading...</p>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 mt-10">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg mb-6 w-full h-72 object-cover"
        />
      )}
      <h1 className="text-4xl font-bold text-blue-700 mb-3">{blog.title}</h1>
      {blog.subtitle && (
        <p className="text-gray-500 italic mb-4">{blog.subtitle}</p>
      )}
      <p className="text-gray-500 mb-6">
        By <span className="font-semibold">{blog.author}</span> •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      {}
      <div
        className="text-gray-700 leading-relaxed text-lg prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <Link
        to="/blog"
        className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
};

export default BlogDetail;

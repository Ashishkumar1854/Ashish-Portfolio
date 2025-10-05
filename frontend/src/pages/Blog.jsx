// src/pages/Blog.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import BlogHero from "../components/BlogHero";
import BlogManager from "./Admin/BlogManager";
import { AuthContext } from "../context/AuthContext";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext); // login user

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/blogs?page=${page}&limit=6&search=${search}`
      );
      setBlogs(res.data.blogs);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <BlogHero onSearch={setSearch} />

      {/* Admin BlogManager */}
      {user?.role === "admin" && <BlogManager fetchBlogs={fetchBlogs} />}

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No blogs found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;

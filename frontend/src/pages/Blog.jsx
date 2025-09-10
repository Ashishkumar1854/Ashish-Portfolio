// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogHero from "../components/BlogHero";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <BlogHero onSearch={setSearch} />

      <div className="max-w-6xl mx-auto py-12 px-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog.slug}`}>
                <BlogCard blog={blog} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

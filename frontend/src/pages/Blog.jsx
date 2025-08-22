// ✅ BlogPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/api/blogs")
    //   .then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
      <div className="space-y-6">
        {blogs.map((blog, idx) => (
          <div key={idx} className="p-4 border rounded shadow-md">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
            <p>{blog.content.slice(0, 150)}...</p>
            <a
              href={`/blog/${blog._id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;

//✅ src/components/BlogCard.jsx
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition">
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-600 line-clamp-3">{blog.content}</p>
        <p className="text-sm text-gray-500 mt-2">
          By {blog.author?.name || "Admin"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;

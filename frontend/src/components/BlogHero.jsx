// ✅ src/components/BlogHero.jsx
import React from "react";

const BlogHero = ({ onSearch }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Ashish Bhai Blogs 🚀
      </h1>
      <p className="max-w-2xl mx-auto text-gray-200 mb-6">
        Read tech stories, tutorials, and updates from our community. Search and
        explore articles that matter.
      </p>
      <input
        type="text"
        placeholder="Search blogs..."
        className="px-4 py-2 rounded-md w-80 text-gray-800 outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default BlogHero;

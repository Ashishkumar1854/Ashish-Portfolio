import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; // icon for delete

const BlogCard = ({ _id, title, content, author, createdAt, onDelete }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Blog Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

      {/* Blog Content (short preview) */}
      <p className="text-gray-700 mb-3 line-clamp-3">{content}</p>

      {/* Footer (author + date) */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{author || "Anonymous"}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      {/* Admin Delete Button */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="mt-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 size={16} /> Delete
        </button>
      )}
    </motion.div>
  );
};

export default BlogCard;

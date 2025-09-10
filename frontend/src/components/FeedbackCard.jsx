// src/components/FeedbackCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MoreVertical, Trash2 } from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const FeedbackCard = ({ feedback, user, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const deleteFeedback = async () => {
    try {
      await axios.delete(`${API_BASE}/api/feedback/${feedback._id}`, {
        withCredentials: true,
      });
      if (onDelete) onDelete(feedback._id);
    } catch (err) {
      console.error("❌ Delete failed:", err.message);
    }
  };

  return (
    <motion.div
      className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between">
        {/* Left: Avatar + User Info */}
        <div className="flex gap-3">
          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {feedback.isAnonymous
              ? "A"
              : feedback.name?.charAt(0)?.toUpperCase()}
          </div>

          {/* Name, Date & Category */}
          <div>
            <p className="font-semibold text-gray-800">
              {feedback.isAnonymous ? "Anonymous" : feedback.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(feedback.createdAt).toLocaleDateString()} •{" "}
              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                {feedback.category}
              </span>
            </p>
          </div>
        </div>

        {/* Admin Menu */}
        {user?.role === "admin" && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-lg z-10">
                <button
                  onClick={deleteFeedback}
                  className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 w-full text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Message */}
      <p className="mt-3 text-gray-700">{feedback.message}</p>

      {/* Rating */}
      <div className="flex gap-1 mt-2 text-yellow-400 text-sm">
        {[...Array(feedback.rating)].map((_, i) => (
          <span key={i}>★</span>
        ))}
        {[...Array(5 - feedback.rating)].map((_, i) => (
          <span key={i} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default FeedbackCard;

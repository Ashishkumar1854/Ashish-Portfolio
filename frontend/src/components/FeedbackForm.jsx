














import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/api"; // ✅ centralized axios instance

const FeedbackForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    category: "General",
    message: "",
    isAnonymous: false,
  });
  const [success, setSuccess] = useState("");

  const handleStarClick = (rating) => setForm({ ...form, rating });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/feedback", form);

      setSuccess("✅ Feedback submitted successfully!");
      setForm({
        name: "",
        rating: 0,
        category: "General",
        message: "",
        isAnonymous: false,
      });

      if (onSuccess) onSuccess(res.data.feedback);
    } catch (err) {
      console.error("❌ Submit failed:", err.message);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 p-4 rounded-xl shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {}
      {!form.isAnonymous && (
        <div>
          <label className="font-medium">Your Name:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      )}

      {}
      <div>
        <label className="font-medium">Rating:</label>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              className={`cursor-pointer text-2xl ${
                star <= form.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {}
      <div>
        <label className="font-medium">Category:</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option>General</option>
          <option>Service</option>
          <option>Website</option>
          <option>Product</option>
          <option>Other</option>
        </select>
      </div>

      {}
      <div>
        <label className="font-medium">Your Feedback:</label>
        <textarea
          rows="3"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isAnonymous}
          onChange={(e) =>
            setForm({ ...form, isAnonymous: e.target.checked, name: "" })
          }
        />
        <span>Submit anonymously</span>
      </div>

      {}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
      >
        Submit Feedback
      </button>

      {success && <p className="text-green-600">{success}</p>}
    </motion.form>
  );
};

export default FeedbackForm;

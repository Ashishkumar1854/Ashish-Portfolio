// ✅ FeedbackPage.jsx
import React, { useState } from "react";
import axios from "axios";

const FeedbackPage = () => {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:5000/api/feedback", form);
    alert("Feedback submitted ✅");
    setForm({ name: "", message: "" });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Feedback"
          className="w-full p-2 border rounded"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;

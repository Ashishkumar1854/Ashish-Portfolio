import React, { useState } from "react";

const HireForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📬 Submitted:", formData);
    alert("Form Submitted! 🚀");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">💼 Hire Freelancer</h2>

        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="projectType"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="">Select Project Type</option>
          <option value="ecommerce">E-Commerce Website</option>
          <option value="ai">AI/ML System</option>
          <option value="video-edit">Video Editing</option>
          <option value="recommendation">Recommendation System</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Describe your project..."
          rows="4"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        ></textarea>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-red-600 underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HireForm;

//frontend/src/pages/HireForm.jsx
import React, { useState } from "react";
import axios from "axios";

const HireForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file select
  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (document) {
        data.append("document", document);
      }

      const res = await axios.post("/api/hire", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        description: "",
      });
      setDocument(null);
    } catch (error) {
      console.error("❌ Hire request failed:", error);
      setMessage("❌ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          💼 Hire a Freelancer
        </h2>

        {message && (
          <p
            className={`mb-4 p-2 text-center rounded ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Project Type */}
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        >
          <option value="">Select Project Type</option>
          <option value="Web Development">Web Developmentst</option>
          <option value="App Development">App Developmensdt</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Design">Design</option>
        </select>

        {/* Budget */}
        <input
          type="text"
          name="budget"
          placeholder="Your Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          rows="4"
          required
        ></textarea>

        {/* File Upload */}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4"
          accept=".pdf,.doc,.docx"
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="reset"
            onClick={() =>
              setFormData({
                name: "",
                email: "",
                phone: "",
                projectType: "",
                budget: "",
                description: "",
              })
            }
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HireForm;

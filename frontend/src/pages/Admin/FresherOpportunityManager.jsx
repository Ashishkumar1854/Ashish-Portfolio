// src/pages/Admin/FresherOpportunityManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FresherOpportunityManager = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    stipend: "",
    description: "",
    link: "",
  });

  const fetchOpportunities = async () => {
    try {
      const res = await axios.get("/api/fresher-opportunities");
      setOpportunities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/fresher-opportunities", formData);
      setFormData({
        role: "",
        company: "",
        stipend: "",
        description: "",
        link: "",
      });
      fetchOpportunities();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/fresher-opportunities/${id}`);
      fetchOpportunities();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Admin: Manage Opportunities
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-lg shadow-lg mb-6 grid gap-4"
      >
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md focus:outline-yellow-400"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md focus:outline-yellow-400"
          required
        />
        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md focus:outline-yellow-400"
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md focus:outline-yellow-400"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border px-2 py-1 rounded-md focus:outline-yellow-400"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-md font-semibold"
        >
          Add Opportunity
        </button>
      </form>

      {/* Existing Opportunities */}
      <div className="grid md:grid-cols-2 gap-4">
        {opportunities.map((op) => (
          <motion.div
            key={op._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <p className="font-semibold">{op.role}</p>
              <p className="text-gray-500 text-sm">{op.company}</p>
            </div>
            <button
              onClick={() => handleDelete(op._id)}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FresherOpportunityManager;

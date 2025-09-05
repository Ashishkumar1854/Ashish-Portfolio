import React, { useState } from "react";
import axios from "axios";

const FresherOpportunityForm = ({ fetchOpportunities }) => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    stipend: "",
    description: "",
    link: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
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
      fetchOpportunities(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mb-6 grid gap-4"
    >
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
        className="border px-2 py-1 rounded-md focus:outline-yellow-400"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
        className="border px-2 py-1 rounded-md focus:outline-yellow-400"
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
        required
        className="border px-2 py-1 rounded-md focus:outline-yellow-400"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="border px-2 py-1 rounded-md focus:outline-yellow-400"
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-md font-semibold"
      >
        Add Opportunity
      </button>
    </form>
  );
};

export default FresherOpportunityForm;

// src/components/admin/SkillForm.jsx

import React, { useState } from "react";

const SkillForm = () => {
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([""]);

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy console for now
    console.log("Submitting:", { category, skills });

    // Future: Replace with axios POST to backend
    // axios.post("/api/skills", { category, skills })
    //   .then(() => alert("Saved!"))
    //   .catch(err => console.error("Failed to save", err));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold mb-4">🛠️ Add Skill Category</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Frontend, Backend, Data Science"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Skills</label>
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="e.g., React, Node.js, Python"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSkill}
            className="mt-2 px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 text-sm"
          >
            ➕ Add Skill
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          ✅ Submit Skills
        </button>
      </form>
    </div>
  );
};

export default SkillForm;

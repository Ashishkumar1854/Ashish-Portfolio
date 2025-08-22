// src/pages/Admin/SkillManager.jsx
import React, { useState } from "react";
import SkillForm from "../../components/admin/SkillForm";

const SkillManager = () => {
  const [skills, setSkills] = useState([]); // Future: fetch from MongoDB

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎯 Manage Skills
      </h2>
      <SkillForm setSkills={setSkills} />

      {/* Preview added skills (local state for now) */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">📊 Preview</h3>
        {skills.map((group, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold text-yellow-600">{group.category}</h4>
            <ul className="list-disc ml-6">
              {group.skills.map((s, i) => (
                <li key={i}>
                  {s.name} - {s.level}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;

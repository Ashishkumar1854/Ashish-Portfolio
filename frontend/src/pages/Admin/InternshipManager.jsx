import React, { useState } from "react";
import InternshipForm from "../../components/admin/InternshipForm";

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);

  const handleAddInternship = (newInternship) => {
    setInternships((prev) => [...prev, newInternship]);
    // TODO: Replace with MongoDB API later
    console.log("✅ New Internship:", newInternship);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💼 Manage Internships</h2>

      <InternshipForm onSubmit={handleAddInternship} />

      <div className="mt-8 grid gap-4">
        {internships.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded shadow bg-white"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-700">
              <strong>Company:</strong> {item.company}
            </p>
            <p className="text-sm text-gray-600">{item.duration}</p>
            <p className="mt-1">{item.description}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Reference
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipManager;

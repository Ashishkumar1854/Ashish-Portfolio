import React, { useState } from "react";
import TimelineEditor from "../../components/admin/TimelineEditor";

const JourneyManager = () => {
  const [timeline, setTimeline] = useState([]);

  const handleAddTimeline = (entry) => {
    setTimeline([...timeline, entry]);
    // ⚠️ TODO: Later connect to MongoDB API
    console.log("📝 New Timeline Entry:", entry);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Manage Journey Timeline</h2>

      <TimelineEditor onSubmit={handleAddTimeline} />

      <div className="mt-8 space-y-4">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded shadow bg-white"
          >
            <p className="text-sm text-gray-500 mb-1">📅 {item.year}</p>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyManager;

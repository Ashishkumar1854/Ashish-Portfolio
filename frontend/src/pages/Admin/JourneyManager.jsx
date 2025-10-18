// import React, { useState, useEffect } from "react";
// import TimelineEditor from "../../components/admin/TimelineEditor";
// import axios from "axios";

// const JourneyManager = () => {
//   const [timeline, setTimeline] = useState([]);
//   const [editingEntry, setEditingEntry] = useState(null);
//   const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

//   // Fetch timeline from backend
//   useEffect(() => {
//     const fetchTimeline = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/journey`);
//         setTimeline(res.data);
//       } catch (err) {
//         console.error("Failed to fetch journey:", err);
//       }
//     };
//     fetchTimeline();
//   }, []);

//   // Add new entry
//   const handleAddTimeline = async (entry) => {
//     try {
//       const res = await axios.post(`${API_BASE}/api/journey`, entry, {
//         withCredentials: true,
//       });
//       setTimeline([...timeline, res.data]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Update entry
//   const handleUpdate = async (id, updatedEntry) => {
//     try {
//       const res = await axios.put(
//         `${API_BASE}/api/journey/${id}`,
//         updatedEntry,
//         { withCredentials: true }
//       );
//       setTimeline(timeline.map((item) => (item._id === id ? res.data : item)));
//       setEditingEntry(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete entry
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this entry?")) return;
//     try {
//       await axios.delete(`${API_BASE}/api/journey/${id}`, {
//         withCredentials: true,
//       });
//       setTimeline(timeline.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">📅 Manage Journey Timeline</h2>

//       <TimelineEditor
//         onSubmit={
//           editingEntry
//             ? (data) => handleUpdate(editingEntry._id, data)
//             : handleAddTimeline
//         }
//         editingEntry={editingEntry}
//         cancelEdit={() => setEditingEntry(null)}
//       />

//       <div className="mt-8 space-y-4">
//         {timeline.map((item) => (
//           <div
//             key={item._id}
//             className="p-4 border border-gray-300 rounded shadow bg-white"
//           >
//             <p className="text-sm text-gray-500 mb-1">📅 {item.year}</p>
//             <h3 className="text-lg font-semibold text-gray-800">
//               {item.title}
//             </h3>
//             <p className="text-gray-700">{item.description}</p>

//             {/* Edit/Delete buttons only for admin */}
//             <div className="mt-2 flex space-x-2">
//               <button
//                 className="px-3 py-1 bg-yellow-500 text-white rounded"
//                 onClick={() => setEditingEntry(item)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="px-3 py-1 bg-red-500 text-white rounded"
//                 onClick={() => handleDelete(item._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JourneyManager;

// src/pages/Admin/JourneyManager.jsx

import React, { useState, useEffect } from "react";
import TimelineEditor from "../../components/admin/TimelineEditor";
import API from "../../utils/api"; // centralized API

const JourneyManager = () => {
  const [timeline, setTimeline] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  // 🔁 Fetch timeline from backend
  const fetchTimeline = async () => {
    try {
      const res = await API.get("/api/journey");
      setTimeline(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch journey timeline:", err.message);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  // ➕ Add new timeline entry
  const handleAddTimeline = async (entry) => {
    try {
      const res = await API.post("/api/journey", entry);
      setTimeline([...timeline, res.data]);
    } catch (err) {
      console.error("❌ Failed to add timeline entry:", err.message);
    }
  };

  // ✏️ Update existing entry
  const handleUpdate = async (id, updatedEntry) => {
    try {
      const res = await API.put(`/api/journey/${id}`, updatedEntry);
      setTimeline(timeline.map((item) => (item._id === id ? res.data : item)));
      setEditingEntry(null);
    } catch (err) {
      console.error("❌ Failed to update timeline entry:", err.message);
    }
  };

  // 🗑 Delete entry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await API.delete(`/api/journey/${id}`);
      setTimeline(timeline.filter((item) => item._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete timeline entry:", err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Manage Journey Timeline</h2>

      <TimelineEditor
        onSubmit={
          editingEntry
            ? (data) => handleUpdate(editingEntry._id, data)
            : handleAddTimeline
        }
        editingEntry={editingEntry}
        cancelEdit={() => setEditingEntry(null)}
      />

      <div className="mt-8 space-y-4">
        {timeline.map((item) => (
          <div
            key={item._id}
            className="p-4 border border-gray-300 rounded shadow bg-white"
          >
            <p className="text-sm text-gray-500 mb-1">📅 {item.year}</p>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.description}</p>

            <div className="mt-2 flex space-x-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => setEditingEntry(item)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyManager;

// //  .................17/07/2025

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";

// const PageASection = () => {
//   const { user } = useAuth();
//   const [sections, setSections] = useState([]);
//   const [selectedSection, setSelectedSection] = useState(""); // ✅ dropdown select
//   const [newItem, setNewItem] = useState({
//     title: "",
//     description: "",
//     link: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/pageA`
//         );
//         setSections(res.data.data?.content || []);
//       } catch (err) {
//         console.error("Fetch Page A Data Error:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Add new item to specific section
//   const handleAddItem = async () => {
//     if (!selectedSection) return alert("Please select a section.");

//     const updated = [...sections];
//     const sectionIndex = updated.findIndex(
//       (s) => s.sectionTitle === selectedSection
//     );

//     if (sectionIndex === -1) {
//       alert("Section not found");
//       return;
//     }

//     updated[sectionIndex].items.push(newItem);

//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "pageA",
//         content: updated,
//       });
//       setSections(updated);
//       setNewItem({ title: "", description: "", link: "" });
//     } catch (err) {
//       console.error("Add Item Error:", err);
//     }
//   };

//   const handleDeleteItem = async (sectionIdx, itemIdx) => {
//     const updated = [...sections];
//     updated[sectionIdx].items.splice(itemIdx, 1);

//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "pageA",
//         content: updated,
//       });
//       setSections(updated);
//     } catch (err) {
//       console.error("Delete Item Error:", err);
//     }
//   };

//   const handleDeleteSection = async (index) => {
//     const updated = sections.filter((_, i) => i !== index);
//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "pageA",
//         content: updated,
//       });
//       setSections(updated);
//     } catch (err) {
//       console.error("Delete Section Error:", err);
//     }
//   };

//   return (
//     <section
//       id="pageA"
//       className="relative bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-20 px-8 rounded-xl shadow-xl space-y-20"
//     >
//       {/* 🎖️ Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center"
//       >
//         <h2 className="text-5xl font-extrabold text-purple-700 flex justify-center items-center gap-3">
//           🏆 Showcasing My Achievements & Credentials
//         </h2>
//         <h3 className="text-xl text-gray-800 italic mt-4">
//           “A journey through certifications, skills, and awards.”
//         </h3>
//       </motion.div>

//       {/* Sections */}
//       <div className="space-y-16">
//         {sections.map((section, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.2 + 0.2 }}
//             className="space-y-8"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="text-3xl font-bold text-pink-600 text-center">
//                 📂 {section.sectionTitle}
//               </h3>
//               {user?.role === "admin" && (
//                 <button
//                   onClick={() => handleDeleteSection(idx)}
//                   className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//                 >
//                   Delete Section
//                 </button>
//               )}
//             </div>

//             {/* Items */}
//             <div className="grid md:grid-cols-2 gap-10">
//               {section.items.map((item, itemIdx) => (
//                 <motion.div
//                   key={itemIdx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: itemIdx * 0.1 }}
//                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//                 >
//                   <h4 className="text-xl font-semibold text-purple-700 mb-2">
//                     {item.title}
//                   </h4>
//                   <p className="text-gray-700 mb-4">{item.description}</p>
//                   <a
//                     href={item.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
//                   >
//                     View Certificate
//                   </a>
//                   {user?.role === "admin" && (
//                     <button
//                       onClick={() => handleDeleteItem(idx, itemIdx)}
//                       className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Delete Item
//                     </button>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ➕ Add Item to Existing Section */}
//       {user?.role === "admin" && sections.length > 0 && (
//         <div className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border space-y-4">
//           <h3 className="text-lg font-bold text-gray-800">➕ Add to Section</h3>

//           <select
//             value={selectedSection}
//             onChange={(e) => setSelectedSection(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="">-- Select Section --</option>
//             {sections.map((sec, idx) => (
//               <option key={idx} value={sec.sectionTitle}>
//                 {sec.sectionTitle}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             placeholder="Item Title"
//             value={newItem.title}
//             onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//             className="w-full border px-3 py-2 rounded"
//           />

//           <textarea
//             placeholder="Item Description"
//             rows={3}
//             value={newItem.description}
//             onChange={(e) =>
//               setNewItem({ ...newItem, description: e.target.value })
//             }
//             className="w-full border px-3 py-2 rounded"
//           />

//           <input
//             type="url"
//             placeholder="Link"
//             value={newItem.link}
//             onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
//             className="w-full border px-3 py-2 rounded"
//           />

//           <button
//             onClick={handleAddItem}
//             className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             ✅ Add to Section
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default PageASection;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api"; // ✅ centralized axios instance

const PageASection = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(""); // ✅ dropdown select
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/home/pageA");
        setSections(res.data.data?.content || []);
      } catch (err) {
        console.error("Fetch Page A Data Error:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Add new item to specific section
  const handleAddItem = async () => {
    if (!selectedSection) return alert("Please select a section.");

    const updated = [...sections];
    const sectionIndex = updated.findIndex(
      (s) => s.sectionTitle === selectedSection
    );

    if (sectionIndex === -1) {
      alert("Section not found");
      return;
    }

    updated[sectionIndex].items.push(newItem);

    try {
      await API.post("/api/home", {
        section: "pageA",
        content: updated,
      });
      setSections(updated);
      setNewItem({ title: "", description: "", link: "" });
    } catch (err) {
      console.error("Add Item Error:", err);
    }
  };

  const handleDeleteItem = async (sectionIdx, itemIdx) => {
    const updated = [...sections];
    updated[sectionIdx].items.splice(itemIdx, 1);

    try {
      await API.post("/api/home", {
        section: "pageA",
        content: updated,
      });
      setSections(updated);
    } catch (err) {
      console.error("Delete Item Error:", err);
    }
  };

  const handleDeleteSection = async (index) => {
    const updated = sections.filter((_, i) => i !== index);
    try {
      await API.post("/api/home", {
        section: "pageA",
        content: updated,
      });
      setSections(updated);
    } catch (err) {
      console.error("Delete Section Error:", err);
    }
  };

  return (
    <section
      id="pageA"
      className="relative bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-20 px-8 rounded-xl shadow-xl space-y-20"
    >
      {/* 🎖️ Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-extrabold text-purple-700 flex justify-center items-center gap-3">
          🏆 Showcasing My Achievements & Credentials
        </h2>
        <h3 className="text-xl text-gray-800 italic mt-4">
          “A journey through certifications, skills, and awards.”
        </h3>
      </motion.div>

      {/* Sections */}
      <div className="space-y-16">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 + 0.2 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-pink-600 text-center">
                📂 {section.sectionTitle}
              </h3>
              {user?.role === "admin" && (
                <button
                  onClick={() => handleDeleteSection(idx)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete Section
                </button>
              )}
            </div>

            {/* Items */}
            <div className="grid md:grid-cols-2 gap-10">
              {section.items.map((item, itemIdx) => (
                <motion.div
                  key={itemIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIdx * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <h4 className="text-xl font-semibold text-purple-700 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    View Certificate
                  </a>
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDeleteItem(idx, itemIdx)}
                      className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete Item
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ➕ Add Item to Existing Section */}
      {user?.role === "admin" && sections.length > 0 && (
        <div className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border space-y-4">
          <h3 className="text-lg font-bold text-gray-800">➕ Add to Section</h3>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Section --</option>
            {sections.map((sec, idx) => (
              <option key={idx} value={sec.sectionTitle}>
                {sec.sectionTitle}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Item Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            placeholder="Item Description"
            rows={3}
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="url"
            placeholder="Link"
            value={newItem.link}
            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            onClick={handleAddItem}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ✅ Add to Section
          </button>
        </div>
      )}
    </section>
  );
};

export default PageASection;

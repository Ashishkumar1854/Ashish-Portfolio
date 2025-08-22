// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// // 🔥 ICON MAPPING (Scalable, Auto-Handles New Skills without breaking UI)
// const iconMap = {
//   HTML: "vscode-icons:file-type-html",
//   CSS: "vscode-icons:file-type-css",
//   JavaScript: "logos:javascript",
//   React: "logos:react",
//   Tailwind: "devicon:tailwindcss",
//   "Node.js": "logos:nodejs-icon",
//   "Express.js": "simple-icons:express",
//   MongoDB: "logos:mongodb",
//   Python: "logos:python",
//   Java: "logos:java",
//   C: "simple-icons:c",
//   Pandas: "simple-icons:pandas",
//   NumPy: "simple-icons:numpy",
//   OpenCV: "simple-icons:opencv",
//   "Scikit-learn": "simple-icons:scikitlearn",
// };

// const SkillsSection = ({ user }) => {
//   const [skills, setSkills] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [newSkills, setNewSkills] = useState({});

//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/skill`
//         );
//         setSkills(res.data.data?.content || {});
//         setNewSkills(res.data.data?.content || {});
//       } catch (err) {
//         console.error("Fetch Skills Error:", err);
//       }
//     };
//     fetchSkills();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "skill",
//         content: newSkills,
//       });
//       setSkills(newSkills);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Save Skills Error:", err);
//     }
//   };

//   const handleChange = (category, index, value) => {
//     const updated = { ...newSkills };
//     updated[category][index] = value;
//     setNewSkills(updated);
//   };

//   const handleAddSkill = (category) => {
//     const updated = { ...newSkills };
//     updated[category] = [...(updated[category] || []), ""];
//     setNewSkills(updated);
//   };

//   const handleDeleteSkill = (category, index) => {
//     const updated = { ...newSkills };
//     updated[category] = updated[category].filter((_, i) => i !== index);
//     setNewSkills(updated);
//   };

//   return (
//     <section id="skills" className="p-8 space-y-6 text-center">
//       <h2 className="text-3xl font-bold mb-4 text-yellow-600">🧠 My Skills</h2>
//       <p className="text-gray-600 mb-8">Here's what I’m confident with:</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {Object.entries(skills).map(([category, techs], idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             className="bg-white shadow-lg rounded-xl p-6"
//           >
//             <h3 className="font-semibold text-lg text-gray-800 capitalize">
//               {category.replace("_", " ")}
//             </h3>
//             <ul className="mt-3 space-y-2">
//               {techs.map((tech, i) => (
//                 <li key={i} className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <span className="text-2xl">
//                       <iconify-icon
//                         icon={iconMap[tech] || "mdi:star"}
//                       ></iconify-icon>
//                     </span>
//                     {editMode ? (
//                       <input
//                         type="text"
//                         value={newSkills[category][i]}
//                         onChange={(e) =>
//                           handleChange(category, i, e.target.value)
//                         }
//                         className="border rounded px-2 py-1 w-full"
//                       />
//                     ) : (
//                       <span className="text-gray-600">{tech}</span>
//                     )}
//                   </div>
//                   {editMode && (
//                     <button
//                       onClick={() => handleDeleteSkill(category, i)}
//                       className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//             {editMode && (
//               <button
//                 onClick={() => handleAddSkill(category)}
//                 className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//               >
//                 ➕ Add Skill
//               </button>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* ✅ Admin Controls */}
//       {user?.role === "admin" && (
//         <div className="space-y-4 mt-8">
//           {editMode ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//             >
//               Edit Skills
//             </button>
//           )}
//         </div>
//       )}
//     </section>
//   );
// };

// export default SkillsSection;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext"; // ✅ add this at top

// // 🎨 ICON MAP for scalable tech icons
// const iconMap = {
//   HTML: "vscode-icons:file-type-html",
//   CSS: "vscode-icons:file-type-css",
//   JavaScript: "logos:javascript",
//   React: "logos:react",
//   Tailwind: "devicon:tailwindcss",
//   "Node.js": "logos:nodejs-icon",
//   "Express.js": "simple-icons:express",
//   MongoDB: "logos:mongodb",
//   Python: "logos:python",
//   Java: "logos:java",
//   C: "simple-icons:c",
//   Pandas: "simple-icons:pandas",
//   NumPy: "simple-icons:numpy",
//   OpenCV: "simple-icons:opencv",
//   "Scikit-learn": "simple-icons:scikitlearn",
// };

// const SkillsSection = () => {
//   const [skills, setSkills] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [newSkills, setNewSkills] = useState({});

//   const { user } = useAuth(); // ✅ use directly

//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/skill`
//         );
//         setSkills(res.data.data?.content || {});
//         setNewSkills(res.data.data?.content || {});
//       } catch (err) {
//         console.error("Fetch Skills Error:", err);
//       }
//     };
//     fetchSkills();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "skill",
//         content: newSkills,
//       });
//       setSkills(newSkills);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Save Skills Error:", err);
//     }
//   };

//   const handleChange = (category, index, value) => {
//     const updated = { ...newSkills };
//     updated[category][index] = value;
//     setNewSkills(updated);
//   };

//   const handleAddSkill = (category) => {
//     const updated = { ...newSkills };
//     updated[category] = [...(updated[category] || []), ""];
//     setNewSkills(updated);
//   };

//   const handleDeleteSkill = (category, index) => {
//     const updated = { ...newSkills };
//     updated[category] = updated[category].filter((_, i) => i !== index);
//     setNewSkills(updated);
//   };

//   return (
//     <section
//       id="skills"
//       className="py-16 px-6 md:px-20 bg-gradient-to-tr from-yellow-50 via-white to-purple-50 rounded-xl shadow-inner"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center"
//       >
//         <h2 className="text-4xl font-extrabold text-purple-700 mb-2">
//           🧠 My Skills
//         </h2>
//         <p className="text-gray-700 mb-12 text-lg">
//           Here's what I’m confident with:
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {Object.entries(skills).map(([category, techs], idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.2 }}
//             className="bg-white border border-purple-100 hover:shadow-xl transition-all duration-300 p-6 rounded-2xl"
//           >
//             <h3 className="text-xl font-semibold text-pink-600 mb-4 capitalize">
//               {category.replace("_", " ")}
//             </h3>
//             <ul className="space-y-3">
//               {techs.map((tech, i) => (
//                 <li
//                   key={i}
//                   className="flex items-center justify-between text-gray-800"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl">
//                       <iconify-icon icon={iconMap[tech] || "mdi:star"} />
//                     </span>
//                     {editMode ? (
//                       <input
//                         value={newSkills[category][i]}
//                         onChange={(e) =>
//                           handleChange(category, i, e.target.value)
//                         }
//                         className="border rounded px-2 py-1 w-full"
//                       />
//                     ) : (
//                       <span>{tech}</span>
//                     )}
//                   </div>
//                   {editMode && (
//                     <button
//                       onClick={() => handleDeleteSkill(category, i)}
//                       className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>

//             {editMode && (
//               <button
//                 onClick={() => handleAddSkill(category)}
//                 className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition"
//               >
//                 ➕ Add Skill
//               </button>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Admin Button Controls */}
//       {user?.role === "admin" && (
//         <div className="mt-10 flex justify-center gap-4">
//           {editMode ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//               >
//                 ✅ Save Changes
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
//             >
//               ✏️ Edit Skills
//             </button>
//           )}
//         </div>
//       )}
//     </section>
//   );
// };

// export default SkillsSection;

/// 15august

// // src/components/SkillsSection.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";

// const iconMap = {
//   HTML: "vscode-icons:file-type-html",
//   CSS: "vscode-icons:file-type-css",
//   JavaScript: "logos:javascript",
//   React: "logos:react",
//   Tailwind: "devicon:tailwindcss",
//   "Node.js": "logos:nodejs-icon",
//   "Express.js": "simple-icons:express",
//   MongoDB: "logos:mongodb",
//   Python: "logos:python",
//   Java: "logos:java",
//   C: "simple-icons:c",
//   Pandas: "simple-icons:pandas",
//   NumPy: "simple-icons:numpy",
//   OpenCV: "simple-icons:opencv",
//   "Scikit-learn": "simple-icons:scikitlearn",
// };

// const formatDate = (d) => {
//   if (!d) return "";
//   const dt = new Date(d);
//   if (Number.isNaN(dt.getTime())) return "";
//   return dt.toLocaleDateString(undefined, {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const SkillsSection = () => {
//   const [skills, setSkills] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [newSkills, setNewSkills] = useState({});
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchSkills();
//   }, []);

//   const fetchSkills = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/skills`
//       );
//       const doc = res?.data?.[0] || {};
//       setSkills(doc?.content || {});
//       setNewSkills(doc?.content || {});
//     } catch (err) {
//       console.error("Fetch Skills Error:", err?.response?.data || err);
//     }
//   };

//   const handleUpdateSkill = async (category, index, name) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/skills`, {
//         category,
//         index,
//         name,
//       });
//       fetchSkills(); // refresh UI after update
//     } catch (err) {
//       console.error("Update Skill Error:", err?.response?.data || err);
//     }
//   };

//   const handleChange = (category, index, value) => {
//     const updated = { ...newSkills };
//     updated[category][index].name = value;
//     setNewSkills(updated);
//   };

//   const handleAddSkill = (category) => {
//     const updated = { ...newSkills };
//     if (!Array.isArray(updated[category])) updated[category] = [];
//     updated[category].push({ name: "", date: new Date() });
//     setNewSkills(updated);
//   };

//   const handleDeleteSkill = async (category, index) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/skills`, {
//         data: { category, index },
//       });
//       fetchSkills();
//     } catch (err) {
//       console.error("Delete Skill Error:", err?.response?.data || err);
//     }
//   };

//   return (
//     <section className="py-16 px-6 md:px-20 bg-gradient-to-tr from-yellow-50 via-white to-purple-50 rounded-xl shadow-inner">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center"
//       >
//         <h2 className="text-4xl font-extrabold text-purple-700 mb-2">
//           🧠 My Skills
//         </h2>
//         <p className="text-gray-700 mb-12 text-lg">
//           Here's what I’m confident with:
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {Object.entries(skills).map(([category, techs], idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.2 }}
//             className="bg-white border border-purple-100 hover:shadow-xl transition-all duration-300 p-6 rounded-2xl"
//           >
//             <h3 className="text-xl font-semibold text-pink-600 mb-4 capitalize">
//               {category.replace("_", " ")}
//             </h3>

//             <ul className="space-y-3">
//               {(techs || []).map((tech, i) => {
//                 const name = tech?.name || "";
//                 const dateToShow = tech?.date || null;
//                 const progress = Math.floor(Math.random() * 40) + 60; // fake % (60–100)

//                 return (
//                   <li
//                     key={i}
//                     className="flex flex-col bg-purple-50 p-3 rounded-lg shadow-sm"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">
//                           <iconify-icon icon={iconMap[name] || "mdi:star"} />
//                         </span>
//                         {editMode ? (
//                           <input
//                             value={newSkills[category][i]?.name || ""}
//                             onChange={(e) =>
//                               handleChange(category, i, e.target.value)
//                             }
//                             onBlur={() =>
//                               handleUpdateSkill(
//                                 category,
//                                 i,
//                                 newSkills[category][i]?.name
//                               )
//                             }
//                             className="border rounded px-2 py-1 w-full"
//                           />
//                         ) : (
//                           <span className="font-medium">{name}</span>
//                         )}
//                       </div>
//                       <span className="text-xs text-gray-500">
//                         {formatDate(dateToShow)}
//                       </span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                       <div
//                         className="bg-purple-500 h-2 rounded-full"
//                         style={{ width: `${progress}%` }}
//                       ></div>
//                     </div>

//                     {editMode && (
//                       <button
//                         onClick={() => handleDeleteSkill(category, i)}
//                         className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>

//             {editMode && (
//               <button
//                 onClick={() => handleAddSkill(category)}
//                 className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition"
//               >
//                 ➕ Add Skill
//               </button>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Admin Controls */}
//       {user?.role === "admin" && (
//         <div className="mt-10 flex justify-center gap-4">
//           {editMode ? (
//             <button
//               onClick={() => setEditMode(false)}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
//             >
//               ✏️ Edit Skills
//             </button>
//           )}
//         </div>
//       )}
//     </section>
//   );
// };

// export default SkillsSection;

// src/components/SkillsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

// ICON MAP (unchanged)
const iconMap = {
  HTML: "vscode-icons:file-type-html",
  CSS: "vscode-icons:file-type-css",
  JavaScript: "logos:javascript",
  React: "logos:react",
  Tailwind: "devicon:tailwindcss",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "simple-icons:express",
  MongoDB: "logos:mongodb",
  Python: "logos:python",
  Java: "logos:java",
  C: "simple-icons:c",
  Pandas: "simple-icons:pandas",
  NumPy: "simple-icons:numpy",
  OpenCV: "simple-icons:opencv",
  "Scikit-learn": "simple-icons:scikitlearn",
};

// Helpers
const formatDate = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// fallback % when level missing
const pctFromName = (name = "") => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return 60 + (h % 36); // 60–95
};

// Normalize incoming content to { category: [ {name, level, date}, ... ] }
const normalizeContent = (raw) => {
  const out = {};
  if (!raw || typeof raw !== "object") return out;

  Object.entries(raw).forEach(([cat, arr]) => {
    if (!arr) {
      out[cat] = [];
      return;
    }

    // If array -> map elements
    if (Array.isArray(arr)) {
      out[cat] = arr.map((item) => {
        // string -> simple object
        if (typeof item === "string") {
          return { name: item, level: undefined, date: undefined };
        }

        // object -> try to extract fields (robust to weird shapes)
        if (item && typeof item === "object") {
          const name =
            item.name ??
            item.title ??
            item.value ??
            // fallback: find first string value in object that isn't ISO-like date
            Object.values(item).find(
              (v) =>
                typeof v === "string" &&
                v.trim() &&
                !/^\d{4}-\d{2}-\d{2}/.test(v)
            ) ??
            "";

          const level =
            item.level !== undefined && item.level !== null
              ? Number(item.level)
              : undefined;

          const date = item.date ?? item.learnedDate ?? undefined;

          return { name: String(name), level, date };
        }

        // other types
        return { name: String(item), level: undefined, date: undefined };
      });
      return;
    }

    // If it's an object (sometimes categories stored as object with numeric keys)
    if (typeof arr === "object") {
      // collect numeric keys as ordered values
      const numericKeys = Object.keys(arr)
        .filter((k) => /^\d+$/.test(k))
        .sort((a, b) => Number(a) - Number(b));

      if (numericKeys.length) {
        out[cat] = numericKeys.map((k) => {
          const v = arr[k];
          if (typeof v === "string")
            return { name: v, level: undefined, date: undefined };
          if (v && typeof v === "object") {
            return {
              name: v.name ?? v.title ?? String(Object.values(v)[0] ?? ""),
              level: v.level !== undefined ? Number(v.level) : undefined,
              date: v.date ?? undefined,
            };
          }
          return { name: String(v), level: undefined, date: undefined };
        });
        return;
      }

      // otherwise fallback
      out[cat] = [];
      return;
    }

    out[cat] = [];
  });

  return out;
};

const SkillsSection = () => {
  // DON'T keep an unused 'skills' variable — use newSkills as the single source of truth
  const [newSkills, setNewSkills] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // your existing endpoint (Home controller)
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/home/skill`
        );
        // robust access: some controllers return data inside data.data or data
        const doc = res?.data?.data || res?.data || {};
        const content = doc?.content || {};
        const normalized = normalizeContent(content);
        setNewSkills(normalized);
      } catch (err) {
        console.error("Fetch Skills Error:", err?.response?.data || err);
      }
    };
    fetchSkills();
  }, []);

  // Bulk save unchanged (keeps your existing flow)
  const handleSave = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
        section: "skill",
        content: newSkills,
      });
      setEditMode(false);
    } catch (err) {
      console.error("Save Skills Error:", err?.response?.data || err);
    }
  };

  // Local edit helper: change a single field (name/level/date) in newSkills
  const handleChange = (category, index, field, value) => {
    setNewSkills((prev) => {
      const copy = { ...prev };
      if (!Array.isArray(copy[category])) copy[category] = [];
      const item = { ...(copy[category][index] || {}) };

      if (field === "level") {
        item.level = value === "" ? undefined : Number(value);
      } else if (field === "date") {
        item.date = value ? new Date(value).toISOString() : undefined;
      } else {
        item[field] = value;
      }

      copy[category][index] = item;
      return copy;
    });
  };

  // Add pushes a proper object (so subsequent render is consistent)
  const handleAddSkill = (category) => {
    setNewSkills((prev) => {
      const copy = { ...prev };
      if (!Array.isArray(copy[category])) copy[category] = [];
      copy[category] = [
        ...copy[category],
        { name: "", level: 50, date: new Date().toISOString() },
      ];
      return copy;
    });
  };

  // Delete (local only — you keep the same delete/save flow)
  const handleDeleteSkill = (category, index) => {
    setNewSkills((prev) => {
      const copy = { ...prev };
      if (!Array.isArray(copy[category])) return prev;
      copy[category] = copy[category].filter((_, i) => i !== index);
      return copy;
    });
  };

  // Per-skill update (calls your backend route that updates only that skill)
  // payload matches backend: { category, index, name?, percentage?, date? }
  const handleUpdateOne = async (category, index) => {
    try {
      const item = newSkills?.[category]?.[index];
      if (!item) return;

      const payload = {
        category,
        index,
        // send fields only if present
        ...(item.name !== undefined ? { name: item.name } : {}),
        ...(item.level !== undefined ? { percentage: item.level } : {}),
        ...(item.date !== undefined ? { date: item.date } : {}),
      };

      // primary mount in your server: /api/home/skills
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/home/skills`,
        payload
      );

      // update local item date if backend didn't set it (ensure user sees immediate change)
      setNewSkills((prev) => {
        const copy = { ...prev };
        const it = { ...(copy[category][index] || {}) };
        if (!it.date) it.date = new Date().toISOString();
        copy[category][index] = it;
        return copy;
      });
    } catch (err) {
      // fallback: try /api/skills (if you mounted that earlier)
      try {
        const item = newSkills?.[category]?.[index];
        const payload = {
          category,
          index,
          ...(item.name !== undefined ? { name: item.name } : {}),
          ...(item.level !== undefined ? { percentage: item.level } : {}),
          ...(item.date !== undefined ? { date: item.date } : {}),
        };
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/skills`,
          payload
        );
        setNewSkills((prev) => {
          const copy = { ...prev };
          const it = { ...(copy[category][index] || {}) };
          if (!it.date) it.date = new Date().toISOString();
          copy[category][index] = it;
          return copy;
        });
      } catch (e) {
        console.error("Update skill failed:", e?.response?.data || e);
      }
    }
  };

  // Delete with backend call
  const handleDeleteWithBackend = async (category, index) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/home/skills`,
        {
          data: { category, index },
        }
      );
      // local update
      handleDeleteSkill(category, index);
    } catch (err) {
      console.error("Delete skill error:", err?.response?.data || err);
    }
  };

  return (
    <section
      id="skills"
      className="py-16 px-6 md:px-20 bg-gradient-to-tr from-yellow-50 via-white to-purple-50 rounded-xl shadow-inner"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-extrabold text-purple-700 mb-2">
          🧠 My Skills
        </h2>
        <p className="text-gray-700 mb-12 text-lg">
          Here's what I’m confident with:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.entries(newSkills || {}).map(([category, techs], idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white border border-purple-100 hover:shadow-xl transition-all duration-300 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-4 capitalize">
              {category.replace("_", " ")}
            </h3>

            <ul className="space-y-3">
              {(techs || []).map((tech, i) => {
                const name = tech?.name ?? String(tech ?? "");
                const level = tech?.level ?? pctFromName(name);
                const dateToShow = tech?.date ?? null;

                return (
                  <li
                    key={i}
                    className="flex flex-col text-gray-800 bg-purple-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          <iconify-icon icon={iconMap[name] || "mdi:star"} />
                        </span>

                        {editMode ? (
                          <>
                            <input
                              value={name}
                              onChange={(e) =>
                                handleChange(
                                  category,
                                  i,
                                  "name",
                                  e.target.value
                                )
                              }
                              onBlur={() => handleUpdateOne(category, i)}
                              className="border rounded px-2 py-1 w-28"
                              placeholder="Skill"
                            />

                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={level}
                              onChange={(e) =>
                                handleChange(
                                  category,
                                  i,
                                  "level",
                                  e.target.value
                                )
                              }
                              onBlur={() => handleUpdateOne(category, i)}
                              className="border rounded px-2 py-1 w-20"
                              placeholder="%"
                            />

                            <input
                              type="date"
                              value={
                                dateToShow
                                  ? new Date(dateToShow)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  category,
                                  i,
                                  "date",
                                  e.target.value
                                    ? new Date(e.target.value).toISOString()
                                    : ""
                                )
                              }
                              onBlur={() => handleUpdateOne(category, i)}
                              className="border rounded px-2 py-1"
                            />
                          </>
                        ) : (
                          <span>{name}</span>
                        )}
                      </div>

                      {dateToShow ? (
                        <span className="text-xs text-gray-500">
                          {formatDate(dateToShow)}
                        </span>
                      ) : (
                        <span className="text-xs text-transparent select-none">
                          —
                        </span>
                      )}
                    </div>

                    {/* Progress bar using level */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, Number(level) || 0)
                          )}%`,
                        }}
                      />
                    </div>

                    {editMode && (
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleDeleteWithBackend(category, i)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {editMode && (
              <button
                onClick={() => handleAddSkill(category)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition"
              >
                ➕ Add Skill
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {user?.role === "admin" && (
        <div className="mt-10 flex justify-center gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                ✅ Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
            >
              ✏️ Edit Skills
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;

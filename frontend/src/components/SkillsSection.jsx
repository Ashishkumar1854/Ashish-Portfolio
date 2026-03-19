// //02 december
// // src/components/SkillsSection.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import API from "../utils/api"; // ✅ unified API
// import { Icon } from "@iconify/react"; // ✅ Import Iconify React

// // ICON MAP
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

// // Helpers
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

// const pctFromName = (name = "") => {
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
//   return 60 + (h % 36);
// };

// // Normalize incoming content
// const normalizeContent = (raw) => {
//   const out = {};
//   if (!raw || typeof raw !== "object") return out;

//   Object.entries(raw).forEach(([cat, arr]) => {
//     if (!arr) {
//       out[cat] = [];
//       return;
//     }

//     if (Array.isArray(arr)) {
//       out[cat] = arr.map((item) => {
//         if (typeof item === "string") {
//           return { name: item, level: undefined, date: undefined };
//         }
//         if (item && typeof item === "object") {
//           const name =
//             item.name ??
//             item.title ??
//             item.value ??
//             Object.values(item).find(
//               (v) =>
//                 typeof v === "string" &&
//                 v.trim() &&
//                 !/^\d{4}-\d{2}-\d{2}/.test(v)
//             ) ??
//             "";

//           const level =
//             item.level !== undefined && item.level !== null
//               ? Number(item.level)
//               : undefined;
//           const date = item.date ?? item.learnedDate ?? undefined;

//           return { name: String(name), level, date };
//         }
//         return { name: String(item), level: undefined, date: undefined };
//       });
//       return;
//     }

//     if (typeof arr === "object") {
//       const numericKeys = Object.keys(arr)
//         .filter((k) => /^\d+$/.test(k))
//         .sort((a, b) => Number(a) - Number(b));
//       if (numericKeys.length) {
//         out[cat] = numericKeys.map((k) => {
//           const v = arr[k];
//           if (typeof v === "string")
//             return { name: v, level: undefined, date: undefined };
//           if (v && typeof v === "object") {
//             return {
//               name: v.name ?? v.title ?? String(Object.values(v)[0] ?? ""),
//               level: v.level !== undefined ? Number(v.level) : undefined,
//               date: v.date ?? undefined,
//             };
//           }
//           return { name: String(v), level: undefined, date: undefined };
//         });
//         return;
//       }
//       out[cat] = [];
//       return;
//     }

//     out[cat] = [];
//   });

//   return out;
// };

// const SkillsSection = () => {
//   const [newSkills, setNewSkills] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const res = await API.get("/api/home/skill");
//         const doc = res?.data?.data || res?.data || {};
//         const content = doc?.content || {};
//         const normalized = normalizeContent(content);
//         setNewSkills(normalized);
//       } catch (err) {
//         console.error("Fetch Skills Error:", err?.response?.data || err);
//       }
//     };
//     fetchSkills();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await API.post("/api/home", { section: "skill", content: newSkills });
//       setEditMode(false);
//     } catch (err) {
//       console.error("Save Skills Error:", err?.response?.data || err);
//     }
//   };

//   const handleChange = (category, index, field, value) => {
//     setNewSkills((prev) => {
//       const copy = { ...prev };
//       if (!Array.isArray(copy[category])) copy[category] = [];
//       const item = { ...(copy[category][index] || {}) };

//       if (field === "level")
//         item.level = value === "" ? undefined : Number(value);
//       else if (field === "date")
//         item.date = value ? new Date(value).toISOString() : undefined;
//       else item[field] = value;

//       copy[category][index] = item;
//       return copy;
//     });
//   };

//   const handleAddSkill = (category) => {
//     setNewSkills((prev) => {
//       const copy = { ...prev };
//       if (!Array.isArray(copy[category])) copy[category] = [];
//       copy[category] = [
//         ...copy[category],
//         { name: "", level: 50, date: new Date().toISOString() },
//       ];
//       return copy;
//     });
//   };

//   const handleDeleteSkill = (category, index) => {
//     setNewSkills((prev) => {
//       const copy = { ...prev };
//       if (!Array.isArray(copy[category])) return prev;
//       copy[category] = copy[category].filter((_, i) => i !== index);
//       return copy;
//     });
//   };

//   const handleUpdateOne = async (category, index) => {
//     try {
//       const item = newSkills?.[category]?.[index];
//       if (!item) return;
//       const payload = {
//         category,
//         index,
//         ...(item.name !== undefined ? { name: item.name } : {}),
//         ...(item.level !== undefined ? { percentage: item.level } : {}),
//         ...(item.date !== undefined ? { date: item.date } : {}),
//       };
//       await API.put("/api/home/skills", payload);

//       setNewSkills((prev) => {
//         const copy = { ...prev };
//         const it = { ...(copy[category][index] || {}) };
//         if (!it.date) it.date = new Date().toISOString();
//         copy[category][index] = it;
//         return copy;
//       });
//     } catch (err) {
//       console.error("Update skill failed:", err?.response?.data || err);
//     }
//   };

//   const handleDeleteWithBackend = async (category, index) => {
//     try {
//       await API.delete("/api/home/skills", { data: { category, index } });
//       handleDeleteSkill(category, index);
//     } catch (err) {
//       console.error("Delete skill error:", err?.response?.data || err);
//     }
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
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//             My Skills - Built for Production
//           </h2>

//           <p className="text-gray-600 mb-8 text-lg leading-relaxed">
//             I design and ship scalable web products and ML systems used by real
//             users. From architecture and front-end UX to backend services,
//             deployment and monitoring — I focus on reliable delivery, measurable
//             impact, and maintainable code.
//           </p>

//           {/* Skill pillars */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
//             <div className="p-5 bg-white shadow-sm rounded-xl border border-gray-100">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold">
//                   FE
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Frontend Engineering
//                 </h3>
//               </div>
//               <p className="text-sm text-gray-600">
//                 React, TypeScript, Vite, Tailwind — performant, accessible UIs
//                 with component-driven design, client-side caching and
//                 progressive enhancement.
//               </p>
//             </div>

//             <div className="p-5 bg-white shadow-sm rounded-xl border border-gray-100">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center text-white font-semibold">
//                   BE
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Backend & APIs
//                 </h3>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Node.js, Express, REST/GraphQL — resilient server-side systems
//                 with clear contracts, auth, rate-limiting, and automated testing
//                 for production workloads.
//               </p>
//             </div>

//             <div className="p-5 bg-white shadow-sm rounded-xl border border-gray-100">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-semibold">
//                   ML
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   ML & Data
//                 </h3>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Prototyping and shipping ML features — from data pipelines and
//                 models to inference and monitoring. Focus on reproducibility and
//                 cost-efficient inference.
//               </p>
//             </div>
//           </div>

//           {/* short credibility line */}
//           <p className="text-gray-500 mt-6 text-sm">
//             Delivered production features for client projects and open-source
//             work — emphasis on quality, observability, and fast iteration.
//           </p>
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {Object.entries(newSkills || {}).map(([category, techs], idx) => (
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
//                 const name = tech?.name ?? String(tech ?? "");
//                 const level = tech?.level ?? pctFromName(name);
//                 const dateToShow = tech?.date ?? null;

//                 return (
//                   <li
//                     key={i}
//                     className="flex flex-col text-gray-800 bg-purple-50 p-3 rounded-lg"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">
//                           {/* ✅ Use Icon component */}
//                           <Icon
//                             icon={iconMap[name] || "mdi:star"}
//                             width={24}
//                             height={24}
//                           />
//                         </span>

//                         {editMode ? (
//                           <>
//                             <input
//                               value={name}
//                               onChange={(e) =>
//                                 handleChange(
//                                   category,
//                                   i,
//                                   "name",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() => handleUpdateOne(category, i)}
//                               className="border rounded px-2 py-1 w-28"
//                               placeholder="Skill"
//                             />
//                             <input
//                               type="number"
//                               min="0"
//                               max="100"
//                               value={level}
//                               onChange={(e) =>
//                                 handleChange(
//                                   category,
//                                   i,
//                                   "level",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() => handleUpdateOne(category, i)}
//                               className="border rounded px-2 py-1 w-20"
//                               placeholder="%"
//                             />
//                             <input
//                               type="date"
//                               value={
//                                 dateToShow
//                                   ? new Date(dateToShow)
//                                       .toISOString()
//                                       .split("T")[0]
//                                   : ""
//                               }
//                               onChange={(e) =>
//                                 handleChange(
//                                   category,
//                                   i,
//                                   "date",
//                                   e.target.value
//                                     ? new Date(e.target.value).toISOString()
//                                     : ""
//                                 )
//                               }
//                               onBlur={() => handleUpdateOne(category, i)}
//                               className="border rounded px-2 py-1"
//                             />
//                           </>
//                         ) : (
//                           <span>{name}</span>
//                         )}
//                       </div>

//                       {dateToShow ? (
//                         <span className="text-xs text-gray-500">
//                           {formatDate(dateToShow)}
//                         </span>
//                       ) : (
//                         <span className="text-xs text-transparent select-none">
//                           —
//                         </span>
//                       )}
//                     </div>

//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                       <div
//                         className="bg-purple-500 h-2 rounded-full"
//                         style={{
//                           width: `${Math.max(
//                             0,
//                             Math.min(100, Number(level) || 0)
//                           )}%`,
//                         }}
//                       />
//                     </div>

//                     {editMode && (
//                       <div className="mt-2 flex gap-2">
//                         <button
//                           onClick={() => handleDeleteWithBackend(category, i)}
//                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                         >
//                           Delete
//                         </button>
//                       </div>
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

//////////////////////////////////////////
// src/components/SkillsSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { Icon } from "@iconify/react";

// ICON MAP
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

const pctFromName = (name = "") => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return 60 + (h % 36);
};

// Normalize incoming content
const normalizeContent = (raw) => {
  const out = {};
  if (!raw || typeof raw !== "object") return out;

  Object.entries(raw).forEach(([cat, arr]) => {
    if (!arr) {
      out[cat] = [];
      return;
    }

    if (Array.isArray(arr)) {
      out[cat] = arr.map((item) => {
        if (typeof item === "string") {
          return { name: item, level: undefined, date: undefined };
        }
        if (typeof item === "object") {
          const name =
            item.name ??
            item.title ??
            item.value ??
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

        return { name: String(item), level: undefined, date: undefined };
      });
      return;
    }

    if (typeof arr === "object") {
      const numericKeys = Object.keys(arr)
        .filter((k) => /^\d+$/.test(k))
        .sort((a, b) => Number(a) - Number(b));

      if (numericKeys.length) {
        out[cat] = numericKeys.map((k) => {
          const v = arr[k];

          if (typeof v === "string")
            return { name: v, level: undefined, date: undefined };

          if (typeof v === "object") {
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

      out[cat] = [];
      return;
    }

    out[cat] = [];
  });

  return out;
};

const SkillsSection = () => {
  const [newSkills, setNewSkills] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/api/home/skill");
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

  const handleSave = async () => {
    try {
      await API.post("/api/home", { section: "skill", content: newSkills });
      setEditMode(false);
    } catch (err) {
      console.error("Save Skills Error:", err?.response?.data || err);
    }
  };

  const handleChange = (category, index, field, value) => {
    setNewSkills((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[category])) updated[category] = [];
      const item = { ...(updated[category][index] || {}) };

      if (field === "level")
        item.level = value === "" ? undefined : Number(value);
      else if (field === "date")
        item.date = value ? new Date(value).toISOString() : undefined;
      else item[field] = value;

      updated[category][index] = item;
      return updated;
    });
  };

  const handleAddSkill = (category) => {
    setNewSkills((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[category])) updated[category] = [];
      updated[category].push({
        name: "",
        level: 50,
        date: new Date().toISOString(),
      });
      return updated;
    });
  };

  const handleDeleteSkill = (category, index) => {
    setNewSkills((prev) => {
      const updated = { ...prev };
      updated[category] = updated[category].filter((_, i) => i !== index);
      return updated;
    });
  };

  const handleUpdateOne = async (category, index) => {
    try {
      const item = newSkills?.[category]?.[index];
      if (!item) return;

      await API.put("/api/home/skills", {
        category,
        index,
        ...(item.name && { name: item.name }),
        ...(item.level && { percentage: item.level }),
        ...(item.date && { date: item.date }),
      });

      setNewSkills((prev) => {
        const updated = { ...prev };
        if (!updated[category][index].date)
          updated[category][index].date = new Date().toISOString();
        return updated;
      });
    } catch (err) {
      console.error("Update skill failed:", err?.response?.data || err);
    }
  };

  const handleDeleteWithBackend = async (category, index) => {
    try {
      await API.delete("/api/home/skills", {
        data: { category, index },
      });
      handleDeleteSkill(category, index);
    } catch (err) {
      console.error("Delete skill error:", err?.response?.data || err);
    }
  };

  // background only on top block
  const bgImagePath = "/skills-bg.jpg";

  return (
    <section id="skills" aria-label="Skills section" className="px-4 md:px-8">
      {/* BACKGROUND AREA (only for the top block) */}
      <div
        className="rounded-xl shadow-inner overflow-hidden"
        style={{
          minHeight: "480px",
          backgroundImage: `url(${bgImagePath})`, // image preserved
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="py-12 sm:py-16 px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="max-w-4xl mx-auto text-center">
              {/* Heading — black */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4 drop-shadow-sm">
                My Skills - Built for Production
              </h2>

              {/* Intro — black */}
              <p className="text-black mb-8 text-sm sm:text-base leading-relaxed">
                I design and ship scalable web products and ML systems used by
                real users. From architecture and front-end UX to backend
                services, deployment and monitoring — I focus on reliable
                delivery, measurable impact, and maintainable code.
              </p>

              {/* FE / BE / ML — translucent panels so image shows through */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {/* translucent panel style:
                    - subtle white tint (bg-white/30) to keep legible
                    - backdrop-blur for frosted look
                    - soft shadow & border for separation
                */}
                <div className="p-5 bg-white/30 backdrop-blur-sm shadow-md rounded-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold">
                      FE
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Frontend Engineering
                    </h3>
                  </div>
                  <p className="text-sm text-gray-800">
                    React, TypeScript, Vite, Tailwind — performant, accessible
                    UIs with component-driven design, client-side caching and
                    progressive enhancement.
                  </p>
                </div>

                <div className="p-5 bg-white/30 backdrop-blur-sm shadow-md rounded-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center text-white font-semibold">
                      BE
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Backend & APIs
                    </h3>
                  </div>
                  <p className="text-sm text-gray-800">
                    Node.js, Express, REST/GraphQL — resilient server-side
                    systems with clear contracts, auth, rate-limiting, and
                    automated testing for production workloads.
                  </p>
                </div>

                <div className="p-5 bg-white/30 backdrop-blur-sm shadow-md rounded-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-semibold">
                      ML
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      ML & Data
                    </h3>
                  </div>
                  <p className="text-sm text-gray-800">
                    Prototyping and shipping ML features — from data pipelines
                    and models to inference and monitoring. Focus on
                    reproducibility and cost-efficient inference.
                  </p>
                </div>
              </div>

              {/* Credibility line — black-ish */}
              <p className="text-black/70 mt-6 text-sm">
                Delivered production features for client projects and
                open-source work — emphasis on quality, observability, and fast
                iteration.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LOWER PART — NO BACKGROUND IMAGE */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {Object.entries(newSkills || {}).map(([category, techs], idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ y: -12, scale: 1.018, rotateX: 2 }}
            className="group relative flex h-full min-h-[345px] flex-col overflow-hidden rounded-[24px] border border-white/40 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(250,245,255,0.92)_38%,rgba(239,246,255,0.88))] p-5 shadow-[0_20px_70px_rgba(76,29,149,0.14)] transition-all duration-500 hover:shadow-[0_30px_95px_rgba(91,33,182,0.22)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_32%)] opacity-90" />
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-80" />
            <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-fuchsia-300/45 blur-3xl transition duration-500 group-hover:scale-110 group-hover:bg-fuchsia-400/55" />
            <div className="absolute -bottom-14 -left-8 h-24 w-24 rounded-full bg-sky-300/35 blur-3xl transition duration-500 group-hover:scale-110 group-hover:bg-sky-400/45" />
            <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/50" />

            <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-sky-600 bg-clip-text text-xl font-bold capitalize text-transparent">
                  {category.replace("_", " ")}
                </h3>
              </div>

              <div className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-fuchsia-700 shadow-sm backdrop-blur">
                {Array.isArray(techs) ? techs.length : 0} tools
              </div>
            </div>

            <ul
              className={`relative z-10 space-y-3 ${
                expandedCategory === category || editMode ? "" : "flex-1"
              }`}
            >
              {(expandedCategory === category || editMode
                ? techs || []
                : (techs || []).slice(0, 3)
              ).map((tech, i) => {
                const name = tech?.name ?? String(tech ?? "");
                const level = tech?.level ?? pctFromName(name);
                const dateToShow = tech?.date ?? null;
                const isExpert = level > 80;

                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 + i * 0.06 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="flex flex-col rounded-2xl border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(250,245,255,0.92)_55%,rgba(243,232,255,0.92))] p-3.5 text-gray-800 shadow-[0_10px_30px_rgba(168,85,247,0.08)] backdrop-blur-sm transition-all duration-300 group-hover:border-fuchsia-200/90 group-hover:shadow-[0_12px_34px_rgba(168,85,247,0.14)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon={iconMap[name] || "mdi:star"}
                          width={24}
                          height={24}
                        />

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
                          <span className="font-medium text-slate-800">
                            {name}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {isExpert && !editMode && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                            Proficient
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {dateToShow ? formatDate(dateToShow) : " "}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-400"
                        style={{
                          width: `${Math.min(100, Math.max(0, level))}%`,
                        }}
                      />
                    </div>

                    {editMode && (
                      <button
                        onClick={() => handleDeleteWithBackend(category, i)}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setExpandedCategory((prev) =>
                    prev === category ? null : category
                  )
                }
                className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(168,85,247,0.28)] transition duration-300 hover:shadow-[0_16px_30px_rgba(168,85,247,0.34)]"
              >
                {expandedCategory === category ? "Show less" : "More"}
              </button>

              {!editMode && expandedCategory !== category && (techs || []).length > 4 && (
                <span className="text-sm text-slate-500">
                  +{(techs || []).length - 3} more skills
                </span>
              )}

              {editMode && (
                <button
                  onClick={() => handleAddSkill(category)}
                  className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Add Skill
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* ADMIN CONTROLS */}
      {user?.role === "admin" && (
        <div className="mt-10 flex justify-center gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Save Changes
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
              Edit Skills
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;

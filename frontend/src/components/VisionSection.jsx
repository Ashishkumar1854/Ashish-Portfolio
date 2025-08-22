// // src/components/VisionSection.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const VisionSection = () => {
//   const [visions, setVisions] = useState([]);

//   useEffect(() => {
//     const fetchVision = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/vision`
//         );
//         setVisions(res.data.data?.content || []);
//       } catch (err) {
//         console.error("Fetch Vision Error:", err);
//       }
//     };
//     fetchVision();
//   }, []);

//   return (
//     <section
//       id="vision"
//       className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16 px-8 rounded-xl shadow-xl space-y-16 text-center"
//     >
//       {/* Background Glows */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <h1 className="text-5xl font-bold mb-4 text-blue-900">🌟 My Vision</h1>
//       {/* 🚀 Main Vision Statement */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10"
//       >
//         <h2 className="text-5xl font-extrabold text-blue-700">
//           🚀 Building Future-Ready Solutions
//         </h2>
//         <h3 className="text-xl text-gray-800 italic mt-4">
//           “Where Ideas Evolve into Impactful Startups”
//         </h3>
//         <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
//           My vision is to create AI-powered, full-stack platforms that redefine
//           industries, empower entrepreneurs, and fuel digital transformation
//           across the globe.
//         </p>
//       </motion.div>

//       {/* 🛠️ Mission Blocks (Dynamic from DB) */}
//       <div className="relative z-10 grid md:grid-cols-2 gap-10">
//         {visions.map((vision, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.3 + 0.3 }}
//             className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//           >
//             <h4 className="text-2xl font-semibold text-yellow-600 mb-2">
//               {vision.title}
//             </h4>
//             {/* ✅ Auto handle array or string */}
//             {Array.isArray(vision.text) ? (
//               vision.text.map((para, i) => (
//                 <p
//                   key={i}
//                   className="text-gray-700 leading-relaxed mb-3 text-left"
//                 >
//                   {para}
//                 </p>
//               ))
//             ) : (
//               <p className="text-gray-700 leading-relaxed">{vision.text}</p>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default VisionSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // ✅ added

const VisionSection = () => {
  const { user } = useAuth(); // ✅ get user
  const [visions, setVisions] = useState([]);
  const [newVision, setNewVision] = useState({ title: "", text: "" });

  useEffect(() => {
    const fetchVision = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/home/vision`
        );
        setVisions(res.data.data?.content || []);
      } catch (err) {
        console.error("Fetch Vision Error:", err);
      }
    };
    fetchVision();
  }, []);

  const handleAdd = async () => {
    try {
      const updated = [...visions, newVision];
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
        section: "vision",
        content: updated,
      });
      setVisions(updated);
      setNewVision({ title: "", text: "" });
    } catch (err) {
      console.error("Add Vision Error:", err);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updated = visions.filter((_, i) => i !== index);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
        section: "vision",
        content: updated,
      });
      setVisions(updated);
    } catch (err) {
      console.error("Delete Vision Error:", err);
    }
  };

  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16 px-8 rounded-xl shadow-xl space-y-16 text-center"
    >
      {/* Glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <h1 className="text-5xl font-bold mb-4 text-blue-900">🌟 My Vision</h1>

      {/* Vision Summary */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-5xl font-extrabold text-blue-700">
          🚀 Building Future-Ready Solutions
        </h2>
        <h3 className="text-xl text-gray-800 italic mt-4">
          “Where Ideas Evolve into Impactful Startups”
        </h3>
        <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
          My vision is to create AI-powered, full-stack platforms that redefine
          industries, empower entrepreneurs, and fuel digital transformation
          across the globe.
        </p>
      </motion.div>

      {/* 🛠️ Vision Cards */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10">
        {visions.map((vision, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3 + 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-semibold text-yellow-600 mb-2">
              {vision.title}
            </h4>
            {Array.isArray(vision.text) ? (
              vision.text.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed mb-3 text-left"
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="text-gray-700 leading-relaxed text-left">
                {vision.text}
              </p>
            )}
            {user?.role === "admin" && (
              <button
                onClick={() => handleDelete(idx)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
              >
                Delete
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* ➕ Admin Add Panel */}
      {user?.role === "admin" && (
        <div className="relative z-10 max-w-xl mx-auto mt-10 space-y-4 bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-lg font-bold text-gray-800">
            ➕ Add Vision Point
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={newVision.title}
            onChange={(e) =>
              setNewVision({ ...newVision, title: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={newVision.text}
            onChange={(e) =>
              setNewVision({ ...newVision, text: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          ></textarea>
          <button
            onClick={handleAdd}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ✅ Add Vision
          </button>
        </div>
      )}
    </section>
  );
};

export default VisionSection;

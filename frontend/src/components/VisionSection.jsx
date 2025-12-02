// //

// //02 december

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import API from "../utils/api"; // ✅ unified API

// const VisionSection = () => {
//   const { user } = useAuth();
//   const [visions, setVisions] = useState([]);
//   const [newVision, setNewVision] = useState({ title: "", text: "" });

//   useEffect(() => {
//     const fetchVision = async () => {
//       try {
//         const res = await API.get("/api/home/vision"); // ✅ replaced axios
//         setVisions(res.data.data?.content || []);
//       } catch (err) {
//         console.error("Fetch Vision Error:", err);
//       }
//     };
//     fetchVision();
//   }, []);

//   const handleAdd = async () => {
//     try {
//       const updated = [...visions, newVision];
//       await API.post("/api/home", {
//         // ✅ replaced axios
//         section: "vision",
//         content: updated,
//       });
//       setVisions(updated);
//       setNewVision({ title: "", text: "" });
//     } catch (err) {
//       console.error("Add Vision Error:", err);
//     }
//   };

//   const handleDelete = async (index) => {
//     try {
//       const updated = visions.filter((_, i) => i !== index);
//       await API.post("/api/home", {
//         // ✅ replaced axios
//         section: "vision",
//         content: updated,
//       });
//       setVisions(updated);
//     } catch (err) {
//       console.error("Delete Vision Error:", err);
//     }
//   };

//   return (
//     <section
//       id="vision"
//       className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16 px-8 rounded-xl shadow-xl space-y-16 text-center"
//     >
//       {/* Glows */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <h1 className="text-5xl font-bold mb-4 text-blue-900"> My Vision</h1>

//       {/* Vision Summary */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10"
//       >
//         <h2 className="text-5xl font-extrabold text-blue-700">
//           Building Future-Ready Solutions
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

//       {/* 🛠️ Vision Cards */}
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
//               <p className="text-gray-700 leading-relaxed text-left">
//                 {vision.text}
//               </p>
//             )}
//             {user?.role === "admin" && (
//               <button
//                 onClick={() => handleDelete(idx)}
//                 className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
//               >
//                 Delete
//               </button>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* ➕ Admin Add Panel */}
//       {user?.role === "admin" && (
//         <div className="relative z-10 max-w-xl mx-auto mt-10 space-y-4 bg-white p-6 rounded-xl shadow-md border">
//           <h3 className="text-lg font-bold text-gray-800">
//             ➕ Add Vision Point
//           </h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newVision.title}
//             onChange={(e) =>
//               setNewVision({ ...newVision, title: e.target.value })
//             }
//             className="w-full border px-3 py-2 rounded"
//           />
//           <textarea
//             placeholder="Description"
//             rows={3}
//             value={newVision.text}
//             onChange={(e) =>
//               setNewVision({ ...newVision, text: e.target.value })
//             }
//             className="w-full border px-3 py-2 rounded"
//           ></textarea>
//           <button
//             onClick={handleAdd}
//             className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             ✅ Add Vision
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default VisionSection;

//////////////////
//02 december add bgr image .........
// src/components/VisionSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api"; // ✅ unified API

const VisionSection = () => {
  const { user } = useAuth();
  const [visions, setVisions] = useState([]);
  const [newVision, setNewVision] = useState({ title: "", text: "" });

  useEffect(() => {
    const fetchVision = async () => {
      try {
        const res = await API.get("/api/home/vision");
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
      await API.post("/api/home", {
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
      await API.post("/api/home", {
        section: "vision",
        content: updated,
      });
      setVisions(updated);
    } catch (err) {
      console.error("Delete Vision Error:", err);
    }
  };

  // image in public folder
  const bgImagePath = "/vision-bg.jpg";

  return (
    <section
      id="vision"
      className="relative overflow-hidden py-16 px-8 rounded-xl shadow-xl"
      aria-label="Vision section"
    >
      {/* Background image with dark overlay so image stays visible but text white works */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImagePath})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Decorative glows (kept subtle) */}
      <div className="absolute top-6 left-6 w-44 h-44 bg-purple-400 rounded-full mix-blend-screen filter blur-2xl opacity-20" />
      <div className="absolute bottom-6 right-6 w-44 h-44 bg-blue-400 rounded-full mix-blend-screen filter blur-2xl opacity-18" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading area (white text) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            My Vision
          </h1>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
            Building Future-Ready Solutions
          </h2>

          <h3 className="text-lg italic mt-4 text-white/90">
            “Where Ideas Evolve into Impactful Startups”
          </h3>

          <p className="text-base md:text-lg mt-6 max-w-3xl mx-auto text-white/90 leading-relaxed">
            My vision is to create AI-powered, full-stack platforms that
            redefine industries, empower entrepreneurs, and fuel digital
            transformation across the globe.
          </p>
        </motion.div>

        {/* Vision Cards (dark translucent panels so white text reads well) */}
        <div className="grid md:grid-cols-2 gap-8 px-4">
          {visions.map((vision, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 + 0.15 }}
              className="rounded-xl p-6 shadow-lg"
              style={{
                background: "rgba(0,0,0,0.45)", // dark translucent
                color: "#fff",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h4 className="text-2xl font-semibold text-white mb-3">
                {vision.title}
              </h4>

              {Array.isArray(vision.text) ? (
                vision.text.map((para, i) => (
                  <p
                    key={i}
                    className="text-white/90 leading-relaxed mb-3 text-left"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-white/90 leading-relaxed text-left">
                  {vision.text}
                </p>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(idx)}
                  className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Admin Add Panel (kept light for input readability) */}
        {user?.role === "admin" && (
          <div
            className="max-w-xl mx-auto mt-10 p-6 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
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
              className="w-full border px-3 py-2 rounded my-2"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={newVision.text}
              onChange={(e) =>
                setNewVision({ ...newVision, text: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
            <button
              onClick={handleAdd}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              ✅ Add Vision
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisionSection;

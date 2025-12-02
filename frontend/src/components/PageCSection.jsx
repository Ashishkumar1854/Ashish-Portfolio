// // src/pages/PageCSection.jsx

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import { Star } from "lucide-react";
// import API from "../utils/api"; // ✅ Use unified API instance

// const PageCSection = () => {
//   const { user } = useAuth();
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({
//     projectName: "",
//     feedback: "",
//     rating: "",
//     description: "",
//   });

//   const fetchTestimonials = async () => {
//     try {
//       const res = await API.get("/api/home/pageC"); // ✅ replaced axios
//       const content = res.data?.data?.content || [];
//       setData(Array.isArray(content) ? content : [content]);
//     } catch (err) {
//       console.error("❌ Fetch Error", err);
//       toast.error(
//         `Fetch failed: ${err?.response?.data?.message || err.message}`
//       );
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.warn("Please login to add a testimonial.");
//       return;
//     }

//     try {
//       const res = await API.post("/api/home/pageC", form); // ✅ replaced axios
//       const content = res.data?.data?.content || [];
//       setData(Array.isArray(content) ? content : [content]);
//       toast.success("✅ Testimonial added!");
//       setForm({ projectName: "", feedback: "", rating: "", description: "" });
//     } catch (err) {
//       console.error("❌ POST Error", err);
//       toast.error(`Add failed: ${err?.response?.data?.message || err.message}`);
//     }
//   };

//   const handleDelete = async (index) => {
//     try {
//       await API.delete(`/api/home/pageC/${index}`); // ✅ replaced axios
//       setData((prev) => prev.filter((_, i) => i !== index));
//       toast.success("🗑️ Testimonial deleted");
//     } catch (err) {
//       console.error("❌ Delete Error", err);
//       toast.error(
//         `Delete failed: ${err?.response?.data?.message || err.message}`
//       );
//     }
//   };

//   return (
//     <section id="pageC" className="py-20 px-8 bg-gray-50 rounded-xl space-y-16">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center"
//       >
//         <h2 className="text-4xl font-bold text-gray-900">
//           🌟 Client Testimonials
//         </h2>
//         <p className="text-gray-600 mt-3 text-lg">
//           Real feedback from projects and collaborations.
//         </p>
//       </motion.div>

//       {/* Testimonials */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {data.length > 0 ? (
//           data.map((item, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="relative group bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//             >
//               <div className="absolute top-4 right-6 text-5xl text-gray-200 font-serif">
//                 “
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {item.projectName}
//               </h3>
//               <p className="text-gray-700 italic leading-relaxed">
//                 “{item.feedback}”
//               </p>
//               {item.description && (
//                 <p className="text-gray-500 mt-3 text-sm">{item.description}</p>
//               )}
//               <div className="flex items-center gap-1 mt-4">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={18}
//                     className={
//                       i < item.rating
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }
//                   />
//                 ))}
//               </div>
//               {user?.role === "admin" && (
//                 <button
//                   onClick={() => handleDelete(idx)}
//                   className="absolute top-4 left-4 bg-red-500 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
//                 >
//                   🗑️ Delete
//                 </button>
//               )}
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">
//             🚫 No testimonials yet.
//           </p>
//         )}
//       </div>

//       {/* Add Form */}
//       {user ? (
//         <form
//           onSubmit={handleSubmit}
//           className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-4 border border-gray-100"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             ➕ Add Your Testimonial
//           </h3>
//           <input
//             type="text"
//             name="projectName"
//             placeholder="Project Name"
//             value={form.projectName}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input
//             type="text"
//             name="feedback"
//             placeholder="Feedback"
//             value={form.feedback}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input
//             type="number"
//             name="rating"
//             placeholder="Rating (1–5)"
//             value={form.rating}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
//             min="1"
//             max="5"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Short Description"
//             rows={3}
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             ✅ Submit Testimonial
//           </button>
//         </form>
//       ) : (
//         <p className="text-center text-gray-500 mt-6">
//           🔒 Please <strong>login</strong> to add your testimonial.
//         </p>
//       )}
//     </section>
//   );
// };

// export default PageCSection;

//02 december

// src/pages/PageCSection.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import API from "../utils/api"; // ✅ Use unified API instance

const PageCSection = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    projectName: "",
    feedback: "",
    rating: "",
    description: "",
  });

  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/api/home/pageC"); // ✅ replaced axios
      const content = res.data?.data?.content || [];
      setData(Array.isArray(content) ? content : [content]);
    } catch (err) {
      console.error("❌ Fetch Error", err);
      toast.error(
        `Fetch failed: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warn("Please login to add a testimonial.");
      return;
    }

    try {
      const res = await API.post("/api/home/pageC", form); // ✅ replaced axios
      const content = res.data?.data?.content || [];
      setData(Array.isArray(content) ? content : [content]);
      toast.success("✅ Testimonial added!");
      setForm({ projectName: "", feedback: "", rating: "", description: "" });
    } catch (err) {
      console.error("❌ POST Error", err);
      toast.error(`Add failed: ${err?.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (index) => {
    try {
      await API.delete(`/api/home/pageC/${index}`); // ✅ replaced axios
      setData((prev) => prev.filter((_, i) => i !== index));
      toast.success("🗑️ Testimonial deleted");
    } catch (err) {
      console.error("❌ Delete Error", err);
      toast.error(
        `Delete failed: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <section id="pageC" className="py-8 px-10 bg-gray-50 rounded-xl space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="mt-20 max-w-4xl mx-auto px-6 text-center">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"></span>
            <span className="uppercase tracking-widest text-sm font-semibold text-purple-600">
              What People Say About Working With Me
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
            Client Feedback & Experience
          </h2>

          {/* Subtext */}
          <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Insights shared by founders, team leads, and collaborators I’ve
            worked with— highlighting how I approach problems, deliver
            solutions, and adapt to real-world challenges.
          </p>

          {/* Decorative Line */}
          <div className="mt-6 h-[2px] max-w-3xl mx-auto bg-gradient-to-r from-gray-200 to-purple-300 rounded-full"></div>

          {/* Small Highlight Text */}
          <p className="text-sm text-gray-500 mt-3 italic">
            *(All opinions are from completed projects, sprints, and long-term
            collaborations.)*
          </p>
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="absolute top-4 right-6 text-5xl text-gray-200 font-serif">
                “
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.projectName}
              </h3>
              <p className="text-gray-700 italic leading-relaxed">
                “{item.feedback}”
              </p>
              {item.description && (
                <p className="text-gray-500 mt-3 text-sm">{item.description}</p>
              )}
              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < item.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(idx)}
                  className="absolute top-4 left-4 bg-red-500 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                >
                  🗑️ Delete
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            🚫 No testimonials yet.
          </p>
        )}
      </div>

      {/* Add Form */}
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-4 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ➕ Add Your Testimonial
          </h3>
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={form.projectName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="feedback"
            placeholder="Feedback"
            value={form.feedback}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1–5)"
            value={form.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
            min="1"
            max="5"
            required
          />
          <textarea
            name="description"
            placeholder="Short Description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            ✅ Submit Testimonial
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          🔒 Please <strong>login</strong> to add your testimonial.
        </p>
      )}
    </section>
  );
};

export default PageCSection;

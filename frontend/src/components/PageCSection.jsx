// // src/pages/PageCSection.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const PageCSection = () => {
//   const { user } = useAuth();
//   const [testimonials, setTestimonials] = useState([]);
//   const [form, setForm] = useState({
//     projectName: "",
//     feedback: "",
//     rating: "",
//     description: "",
//   });

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/pageC`
//         );
//         if (res.data?.data?.content) {
//           setTestimonials(res.data.data.content);
//         } else {
//           toast.warn("⚠️ No testimonials found.");
//         }
//       } catch (err) {
//         toast.error("❌ Failed to fetch testimonials.");
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/home/pageC`,
//         form
//       );
//       if (res.data?.data?.content) {
//         toast.success("✅ Testimonial submitted!");
//         setTestimonials(res.data.data.content);
//         setForm({ projectName: "", feedback: "", rating: "", description: "" });
//       }
//     } catch (err) {
//       toast.error("❌ Submission failed.");
//     }
//   };

//   const handleDelete = async (index) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/home/pageC/${index}`
//       );
//       const updated = testimonials.filter((_, i) => i !== index);
//       setTestimonials(updated);
//       toast.success("🗑️ Deleted testimonial.");
//     } catch (err) {
//       toast.error("❌ Delete failed.");
//     }
//   };

//   return (
//     <section
//       id="pageC"
//       className="py-20 px-6 bg-gradient-to-br from-yellow-50 via-white to-orange-50 space-y-16 rounded-xl shadow-lg"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center"
//       >
//         <h2 className="text-5xl font-extrabold text-orange-600">
//           💬 Client Testimonials
//         </h2>
//         <p className="text-xl mt-4 text-gray-700">
//           “Real words from real clients — see how I delivered value on every
//           project.”
//         </p>
//       </motion.div>

//       {/* Testimonials */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {testimonials.length > 0 ? (
//           testimonials.map((t, i) => (
//             <motion.div
//               key={i}
//               className="bg-white p-4 rounded-xl shadow-md border"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h3 className="text-xl font-semibold text-orange-700">
//                 {t.projectName}
//               </h3>
//               <p className="italic text-gray-600">"{t.feedback}"</p>
//               <p className="text-gray-800 mt-2">{t.description}</p>
//               <p className="text-sm text-yellow-600 font-bold">
//                 ⭐ {t.rating}/5
//               </p>

//               {user?.role === "admin" && (
//                 <button
//                   onClick={() => handleDelete(i)}
//                   className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   🗑️ Delete
//                 </button>
//               )}
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-600 font-medium">No testimonials yet.</p>
//         )}
//       </div>

//       {/* Form for adding testimonial */}
//       {user && (
//         <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 border">
//           <h3 className="text-lg font-bold text-gray-800">
//             ✍️ Add Your Testimonial
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="projectName"
//               placeholder="Project Name"
//               value={form.projectName}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="feedback"
//               placeholder="Short Feedback"
//               value={form.feedback}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//             <input
//               type="number"
//               name="rating"
//               placeholder="Rating (1-5)"
//               value={form.rating}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               min="1"
//               max="5"
//               required
//             />
//             <textarea
//               name="description"
//               placeholder="Project Description"
//               rows="3"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
//             >
//               ✅ Submit Testimonial
//             </button>
//           </form>
//         </div>
//       )}
//     </section>
//   );
// };

// export default PageCSection;

// src/pages/PageCSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PageCSection = () => {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    projectName: "",
    feedback: "",
    rating: "",
    description: "",
  });

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/home/pageC`
      );
      if (res.data?.data?.content) {
        setTestimonials(res.data.data.content);
      } else {
        toast.warn("⚠️ No testimonials found.");
      }
    } catch (err) {
      toast.error("❌ Failed to fetch testimonials.");
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
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/home/pageC`,
        form
      );
      if (res.data?.data?.content) {
        toast.success("✅ Testimonial submitted!");
        setForm({ projectName: "", feedback: "", rating: "", description: "" });
        fetchTestimonials(); // refetch fresh data
      }
    } catch (err) {
      toast.error("❌ Submission failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/home/pageC/${id}`
      );
      setTestimonials(testimonials.filter((t) => t._id !== id));
      toast.success("🗑️ Deleted testimonial.");
    } catch (err) {
      toast.error("❌ Delete failed.");
    }
  };

  return (
    <section
      id="pageC"
      className="py-20 px-6 bg-gradient-to-br from-yellow-50 via-white to-orange-50 space-y-16 rounded-xl shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-extrabold text-orange-600">
          💬 Client Testimonials
        </h2>
        <p className="text-xl mt-4 text-gray-700 max-w-2xl mx-auto">
          “Real words from real clients — see how I delivered value on every
          project.”
        </p>
      </motion.div>

      {/* Testimonials List */}
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <motion.div
              key={t._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-orange-700">
                  {t.projectName}
                </h3>
                {/* ⭐ Rating */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={
                        idx < Number(t.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="italic text-gray-600">“{t.feedback}”</p>
              <p className="text-gray-800 mt-3 leading-relaxed">
                {t.description}
              </p>

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(t._id)}
                  className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  🗑️ Delete
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 font-medium col-span-2 text-center">
            No testimonials yet.
          </p>
        )}
      </div>

      {/* Submit Form */}
      {user && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">
            ✍️ Add Your Testimonial
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="projectName"
              placeholder="Project Name"
              value={form.projectName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="feedback"
              placeholder="Short Feedback"
              value={form.feedback}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={form.rating}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min="1"
              max="5"
              required
            />
            <textarea
              name="description"
              placeholder="Project Description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-medium"
            >
              ✅ Submit Testimonial
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default PageCSection;

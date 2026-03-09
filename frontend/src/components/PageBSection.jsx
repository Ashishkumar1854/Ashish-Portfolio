// //02 december

// import React, { useEffect, useState } from "react";
// import API from "../utils/api";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const PageBSection = () => {
//   const { user } = useAuth();
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     link: "",
//   });

//   // ✅ Fetch PageB data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await API.get("/api/home/pageB");

//         if (res.data?.data?.content) {
//           const contentArray = Array.isArray(res.data.data.content)
//             ? res.data.data.content
//             : [res.data.data.content];
//           setData(contentArray);
//         } else {
//           toast.warn("⚠️ Unexpected PageB data structure.");
//         }
//       } catch (err) {
//         console.error("❌ PageB Fetch Error", err);
//         toast.error(
//           `Fetch failed: ${err?.response?.data?.message || err.message}`
//         );
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle add/update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newItem = {
//         title: form.title,
//         description: form.description,
//         link: form.link,
//       };

//       const updatedContent = [...data, newItem];

//       // ✅ send correct format expected by backend
//       const res = await API.post("/api/home", {
//         section: "pageB",
//         content: updatedContent,
//       });

//       if (res.data?.success) {
//         toast.success("✅ PageB content added!");
//         setData(updatedContent);
//         setForm({ title: "", description: "", link: "" });
//       } else {
//         toast.warn("⚠️ No content returned after save.");
//       }
//     } catch (err) {
//       console.error("❌ POST Error", err);
//       toast.error(
//         `Save failed: ${err?.response?.data?.message || err.message}`
//       );
//     }
//   };

//   // ✅ Handle delete (frontend + DB sync)
//   const handleDelete = async (index) => {
//     try {
//       const updatedContent = data.filter((_, i) => i !== index);

//       // ✅ send the new full content array
//       const res = await API.post("/api/home", {
//         section: "pageB",
//         content: updatedContent,
//       });

//       if (res.data?.success) {
//         setData(updatedContent);
//         toast.success("🗑️ PageB content deleted");
//       } else {
//         toast.warn("⚠️ Delete request failed to update DB.");
//       }
//     } catch (err) {
//       console.error("❌ Delete Error", err);
//       toast.error(
//         `Delete failed: ${err?.response?.data?.message || err.message}`
//       );
//     }
//   };

//   return (
//     <section id="pageB" className="relative bg-white py-20 px-6 space-y-16">
//       {/* --- Section Heading (Modern, Clean, Professional) --- */}
//       <motion.div
//         initial={{ opacity: 0, y: 32 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-4xl mx-auto text-center"
//       >
//         {/* Top Accent Line */}
//         <div className="flex items-center justify-center mb-6">
//           <span className="h-1 w-20 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"></span>
//         </div>

//         {/* Main Heading */}
//         <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
//           From Concept to Execution — a Transparent Build Journey
//         </h2>

//         {/* Subtext Line 1 */}
//         <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
//           A behind-the-scenes look into how I take raw ideas, break them down,
//           validate assumptions, and turn experiments into working product
//           features.
//         </p>

//         {/* Subtext Line 2 */}
//         <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
//           I share prototypes, failures, iterations, and decisions — exactly how
//           real startup product teams work. Each post documents my reasoning,
//           mistakes, and the engineering choices that shaped the final outcome.
//         </p>

//         {/* Decorative bottom fade divider */}
//         <div className="mt-8 flex justify-center">
//           <span className="h-[1.5px] w-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></span>
//         </div>
//       </motion.div>

//       {/* Content Cards */}
//       {data && data.length > 0 ? (
//         data.map((item, idx) => (
//           <motion.div
//             key={idx}
//             className="bg-white p-6 max-w-3xl mx-auto rounded-xl shadow-lg space-y-4"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <h3 className="text-3xl font-bold text-green-700">{item.title}</h3>
//             <p className="text-gray-700">{item.description}</p>

//             {item.link && (
//               <a
//                 href={item.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
//               >
//                 📎 View Document
//               </a>
//             )}

//             {user?.role === "admin" && (
//               <button
//                 onClick={() => handleDelete(idx)}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//               >
//                 🗑️ Delete Content
//               </button>
//             )}
//           </motion.div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500 font-medium">
//           🚫 No PageB content available.
//         </p>
//       )}

//       {/* Admin Form */}
//       {user?.role === "admin" && (
//         <div className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border space-y-4">
//           <h3 className="text-lg font-bold text-gray-800">
//             ➕ Add / Edit PageB
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={form.title}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />

//             <textarea
//               name="description"
//               placeholder="Description"
//               rows={3}
//               value={form.description}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />

//             <input
//               type="text"
//               name="link"
//               placeholder="Document Link (GitHub or Drive)"
//               value={form.link}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />

//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
//             >
//               ✅ Save Content
//             </button>
//           </form>
//         </div>
//       )}
//     </section>
//   );
// };

// export default PageBSection;

////////////////////////////////
//30 december ..with bg image ........
// src/components/PageBSection.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PageBSection = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/home/pageB");
        if (res.data?.data?.content) {
          const contentArray = Array.isArray(res.data.data.content)
            ? res.data.data.content
            : [res.data.data.content];
          setData(contentArray);
        } else {
          toast.warn("⚠️ Unexpected PageB data structure.");
        }
      } catch (err) {
        console.error("❌ PageB Fetch Error", err);
        toast.error(
          `Fetch failed: ${err?.response?.data?.message || err.message}`
        );
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = {
        title: form.title,
        description: form.description,
        link: form.link,
      };

      const updatedContent = [...data, newItem];

      const res = await API.post("/api/home", {
        section: "pageB",
        content: updatedContent,
      });

      if (res.data?.success) {
        toast.success("✅ PageB content added!");
        setData(updatedContent);
        setForm({ title: "", description: "", link: "" });
      } else {
        toast.warn("⚠️ No content returned after save.");
      }
    } catch (err) {
      console.error("❌ POST Error", err);
      toast.error(
        `Save failed: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedContent = data.filter((_, i) => i !== index);

      const res = await API.post("/api/home", {
        section: "pageB",
        content: updatedContent,
      });

      if (res.data?.success) {
        setData(updatedContent);
        toast.success("🗑️ PageB content deleted");
      } else {
        toast.warn("⚠️ Delete request failed to update DB.");
      }
    } catch (err) {
      console.error("❌ Delete Error", err);
      toast.error(
        `Delete failed: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  // Put your image at public/pageb-bg.jpg
  const bgImagePath = "/pageb-bg.jpg";

  return (
    <section id="pageB" className="relative bg-white py-20 px-6">
      {/* ===== HERO: full image (no cropping) with overlay + centered text ===== */}
      <div className="mx-auto w-full rounded-2xl overflow-hidden shadow-inner">
        {/* actual image element ensures the whole photo is visible */}
        <div className="relative">
          <img
            src={bgImagePath}
            alt="From concept to execution"
            className="w-full h-auto block"
            style={{ display: "block", maxWidth: "100%" }}
          />

          {/* overlay for readability */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.36)" }}
          />

          {/* centered content over the image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 hidden sm:flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12"
          >
            <div className="max-w-4xl text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="h-1 w-20 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                From Concept to Execution — a Transparent Build Journey
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
                A behind-the-scenes look into how I take raw ideas, break them
                down, validate assumptions, and turn experiments into working
                product features.
              </p>

              <p className="mt-4 text-sm sm:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
                I share prototypes, failures, iterations, and decisions —
                exactly how real startup product teams work. Each post documents
                my reasoning, mistakes, and the engineering choices that shaped
                the final outcome.
              </p>

              <div className="mt-8 flex justify-center">
                <span className="h-[1.5px] w-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-80" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-only text (prevents overlay clipping on small screens) */}
      <div className="sm:hidden mt-6 text-center px-4">
        <div className="flex items-center justify-center mb-4">
          <span className="h-1 w-16 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-snug">
          From Concept to Execution — a Transparent Build Journey
        </h2>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          A behind-the-scenes look into how I take raw ideas, break them down,
          validate assumptions, and turn experiments into working product
          features.
        </p>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          I share prototypes, failures, iterations, and decisions — exactly how
          real startup product teams work. Each post documents my reasoning,
          mistakes, and the engineering choices that shaped the final outcome.
        </p>
      </div>

      {/* ===== CONTENT CARDS (unchanged) ===== */}
      <div className="space-y-8 mt-12">
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 max-w-3xl mx-auto rounded-xl shadow-lg space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-green-700">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  📎 View Document
                </a>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(idx)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  🗑️ Delete Content
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-medium">
            🚫 No PageB content available.
          </p>
        )}
      </div>

      {/* ===== ADMIN FORM (unchanged) ===== */}
      {user?.role === "admin" && (
        <div className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border space-y-4">
          <h3 className="text-lg font-bold text-gray-800">
            ➕ Add / Edit PageB
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="link"
              placeholder="Document Link (GitHub or Drive)"
              value={form.link}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              ✅ Save Content
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default PageBSection;

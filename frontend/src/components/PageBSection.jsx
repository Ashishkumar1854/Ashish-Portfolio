// const PageBSection = () => {
//   return (
//     <section id="pageB" className="p-8 bg-green-100 text-center">
//       <h2 className="text-3xl font-bold mb-4 text-green-700">
//         📘 Page A - Highlights
//       </h2>
//       <p className="text-gray-700">
//         This section can be used to display certifications, GitHub stats,
//         awards, or freelance experience.
//       </p>
//     </section>
//   );
// };
// export default PageBSection;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const PageBSection = () => {
//   const { user } = useAuth();
//   const [data, setData] = useState(null);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     pdf: null,
//     ctaText: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/pageB`
//         );

//         if (res.data?.content) {
//           setData(res.data.content);
//         } else if (res.data?.data?.content) {
//           setData(res.data.data.content);
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

//   const handleChange = (e) => {
//     if (e.target.name === "pdf") {
//       setForm({ ...form, pdf: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     fd.append("ctaText", form.ctaText);
//     if (form.pdf) fd.append("pdf", form.pdf);

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/home/pageB`,
//         fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res.data?.data?.content) {
//         toast.success("✅ Page B updated!");
//         setData(res.data.data.content);
//         setForm({ title: "", description: "", pdf: null, ctaText: "" });
//       } else {
//         toast.warn("⚠️ No content returned after update.");
//       }
//     } catch (err) {
//       console.error("❌ POST Error", err);
//       toast.error(
//         `Update failed: ${err?.response?.data?.message || err.message}`
//       );
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/home/pageB`);
//       setData(null);
//       toast.success("🗑️ Page B content deleted");
//     } catch (err) {
//       console.error("❌ Delete Error", err);
//       toast.error(
//         `Delete failed: ${err?.response?.data?.message || err.message}`
//       );
//     }
//   };

//   return (
//     <section
//       id="pageB"
//       className="relative bg-gradient-to-r from-green-50 via-white to-purple-50 py-20 px-8 rounded-xl shadow-xl space-y-20"
//     >
//       {/* 🎖️ Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center"
//       >
//         <h2 className="text-5xl font-extrabold text-green-700 flex justify-center items-center gap-3">
//           🚀 Startup Guide / Single Section Highlight
//         </h2>
//         <h3 className="text-xl text-gray-800 italic mt-4">
//           “Download our latest resource or guide”
//         </h3>
//       </motion.div>

//       {/* Content Card */}
//       {data ? (
//         <motion.div
//           className="bg-white p-6 max-w-3xl mx-auto rounded-xl shadow-lg space-y-4"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h3 className="text-3xl font-bold text-green-700">{data.title}</h3>
//           <p className="text-gray-700">{data.description}</p>
//           {data.cta?.link && (
//             <a
//               href={data.cta.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               download
//               className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
//             >
//               📎 {data.cta.text || "Download PDF"}
//             </a>
//           )}

//           {user?.role === "admin" && (
//             <button
//               onClick={handleDelete}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//             >
//               🗑️ Delete Content
//             </button>
//           )}
//         </motion.div>
//       ) : (
//         <p className="text-center text-gray-500 font-medium">
//           🚫 No Page B content available.
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
//               name="ctaText"
//               placeholder="CTA Button Text"
//               value={form.ctaText}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />

//             <input
//               type="file"
//               name="pdf"
//               accept="application/pdf"
//               onChange={handleChange}
//               className="w-full"
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PageBSection = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "", // ✅ single link field
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/home/pageB`
        );

        if (res.data?.data?.content) {
          setData(res.data.data.content);
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
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/home/pageB`,
        form
      );

      if (res.data?.data?.content) {
        toast.success("✅ Page B updated!");
        setData(res.data.data.content);
        setForm({ title: "", description: "", link: "" });
      } else {
        toast.warn("⚠️ No content returned after update.");
      }
    } catch (err) {
      console.error("❌ POST Error", err);
      toast.error(
        `Update failed: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/home/pageB`);
      setData(null);
      toast.success("🗑️ Page B content deleted");
    } catch (err) {
      console.error("❌ Delete Error", err);
      toast.error(
        `Delete failed: ${err?.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <section
      id="pageB"
      className="relative bg-gradient-to-r from-green-50 via-white to-purple-50 py-20 px-8 rounded-xl shadow-xl space-y-20"
    >
      {/* 🎖️ Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-extrabold text-green-700 flex justify-center items-center gap-3">
          🌱 From Idea to Impact: My Startup Journey in Code.
        </h2>
        <h3 className="text-xl text-gray-800 italic mt-4">
          🚀 "See My Startup Blueprint – Code, Failures & Fixes in Progress."
        </h3>
        <p className="text-xl text-gray-800 italic mt-4">
          “Every great product starts with a problem — and not every attempt
          ends in success. I’m building solutions, one deploy at a time —
          experimenting, learning, failing, and iterating fast. Download my
          latest prototype, codebase, or strategy notes. 📉 See what worked,
          what didn’t — and how I turned failures into features.”
        </p>
      </motion.div>

      {/* Content Card */}
      {data ? (
        <motion.div
          className="bg-white p-6 max-w-3xl mx-auto rounded-xl shadow-lg space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-3xl font-bold text-green-700">{data.title}</h3>
          <p className="text-gray-700">{data.description}</p>

          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              📎 View Document
            </a>
          )}

          {user?.role === "admin" && (
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              🗑️ Delete Content
            </button>
          )}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 font-medium">
          🚫 No Page B content available.
        </p>
      )}

      {/* Admin Form */}
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

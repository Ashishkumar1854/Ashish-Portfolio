//05/09

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const FresherOpportunities = () => {
//   const { user } = useAuth(); // get current user
//   const [opportunities, setOpportunities] = useState([]);
//   const [newOpportunity, setNewOpportunity] = useState({
//     role: "",
//     company: "",
//     stipend: "",
//     description: "",
//     link: "",
//   });

//   const isAdmin = user?.role === "admin";

//   // ✅ Fetch all opportunities
//   const fetchOpportunities = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities`,
//         {
//           withCredentials: true,
//         }
//       );
//       setOpportunities(res.data);
//     } catch (err) {
//       console.error("Fetch opportunities error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, []);

//   // ✅ Add new opportunity
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities`,
//         newOpportunity,
//         { withCredentials: true }
//       );
//       setNewOpportunity({
//         role: "",
//         company: "",
//         stipend: "",
//         description: "",
//         link: "",
//       });
//       fetchOpportunities();
//     } catch (err) {
//       console.error("Add opportunity error:", err);
//     }
//   };

//   // ✅ Delete opportunity
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       fetchOpportunities();
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <motion.div
//       className="max-w-7xl mx-auto p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.h1
//         className="text-4xl font-bold text-gray-800 mb-6 text-center"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         💼 Fresher Opportunities
//       </motion.h1>

//       {/* Admin Add Form */}
//       {isAdmin && (
//         <form
//           onSubmit={handleAdd}
//           className="mb-6 p-4 border rounded-lg bg-gray-50 shadow"
//         >
//           <h3 className="text-lg font-semibold mb-2">Add New Opportunity</h3>
//           <input
//             type="text"
//             placeholder="Role"
//             value={newOpportunity.role}
//             onChange={(e) =>
//               setNewOpportunity({ ...newOpportunity, role: e.target.value })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Company"
//             value={newOpportunity.company}
//             onChange={(e) =>
//               setNewOpportunity({ ...newOpportunity, company: e.target.value })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Stipend"
//             value={newOpportunity.stipend}
//             onChange={(e) =>
//               setNewOpportunity({ ...newOpportunity, stipend: e.target.value })
//             }
//             className="mb-2 p-2 border rounded w-full"
//           />
//           <textarea
//             placeholder="Description"
//             value={newOpportunity.description}
//             onChange={(e) =>
//               setNewOpportunity({
//                 ...newOpportunity,
//                 description: e.target.value,
//               })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Link"
//             value={newOpportunity.link}
//             onChange={(e) =>
//               setNewOpportunity({ ...newOpportunity, link: e.target.value })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Opportunity
//           </button>
//         </form>
//       )}

//       {/* Opportunities List */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {opportunities.map((op) => (
//           <motion.div
//             key={op._id}
//             className="bg-white p-4 rounded-lg shadow-lg border hover:border-yellow-400 transition duration-300"
//             whileHover={{ scale: 1.05 }}
//           >
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               {op.role}
//             </h3>
//             <p className="text-gray-600 mb-1">
//               <strong>Company:</strong> {op.company}
//             </p>
//             <p className="text-gray-600 mb-1">
//               <strong>Stipend:</strong> {op.stipend || "Not disclosed"}
//             </p>
//             <p className="text-gray-500 mb-2 text-sm">{op.description}</p>
//             <a
//               href={op.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-yellow-500 font-semibold hover:underline"
//             >
//               Apply / View Details
//             </a>

//             {/* Delete only for admin */}
//             {isAdmin && (
//               <button
//                 onClick={() => handleDelete(op._id)}
//                 className="mt-2 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
//               >
//                 Delete
//               </button>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default FresherOpportunities;

//optimized

// src/pages/FresherOpportunities.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FresherOpportunities = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    role: "",
    company: "",
    stipend: "",
    description: "",
    link: "",
  });

  const isAdmin = user?.role === "admin";

  // Fetch opportunities
  const fetchOpportunities = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities`,
        { withCredentials: true }
      );
      setOpportunities(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Add new opportunity
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities`,
        newOpportunity,
        { withCredentials: true }
      );
      setNewOpportunity({
        role: "",
        company: "",
        stipend: "",
        description: "",
        link: "",
      });
      fetchOpportunities();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // Delete opportunity
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities/${id}`,
        { withCredentials: true }
      );
      fetchOpportunities();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl p-10 mb-10 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold mb-4">
          💼 Fresher Opportunities
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-4">
          Skip fake job listings and apply to{" "}
          <strong>100% verified internships & jobs</strong> curated for
          freshers. Only opportunities that match your skills and resume.
        </p>
        <p className="italic font-light text-gray-200">
          Learn, apply, and start your professional journey confidently.
        </p>
      </motion.div>

      {/* Admin Form */}
      {isAdmin && (
        <motion.form
          onSubmit={handleAdd}
          className="mb-10 p-6 rounded-xl shadow-xl bg-gray-50 border border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Add New Opportunity
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Role"
              value={newOpportunity.role}
              onChange={(e) =>
                setNewOpportunity({ ...newOpportunity, role: e.target.value })
              }
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={newOpportunity.company}
              onChange={(e) =>
                setNewOpportunity({
                  ...newOpportunity,
                  company: e.target.value,
                })
              }
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Stipend"
              value={newOpportunity.stipend}
              onChange={(e) =>
                setNewOpportunity({
                  ...newOpportunity,
                  stipend: e.target.value,
                })
              }
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Link"
              value={newOpportunity.link}
              onChange={(e) =>
                setNewOpportunity({ ...newOpportunity, link: e.target.value })
              }
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <textarea
            placeholder="Description"
            value={newOpportunity.description}
            onChange={(e) =>
              setNewOpportunity({
                ...newOpportunity,
                description: e.target.value,
              })
            }
            className="mt-4 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Opportunity
          </button>
        </motion.form>
      )}

      {/* Opportunities List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((op) => (
          <motion.div
            key={op._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition relative"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              {op.role}
            </h3>
            <p className="text-gray-600 mb-1">
              <strong>Company:</strong> {op.company}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Stipend:</strong> {op.stipend || "Not disclosed"}
            </p>
            <p className="text-gray-500 mb-4 text-sm">{op.description}</p>
            <a
              href={op.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              Apply / View Details
            </a>

            {isAdmin && (
              <button
                onClick={() => handleDelete(op._id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Delete
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FresherOpportunities;

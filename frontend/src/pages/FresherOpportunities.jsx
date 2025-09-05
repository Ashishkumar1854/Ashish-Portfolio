// // src/pages/FresherOpportunities.jsx
// import React from "react";
// import FresherOpportunityList from "../components/FresherOpportunityList";
// import { motion } from "framer-motion";

// const FresherOpportunities = () => {
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
//       <FresherOpportunityList />
//     </motion.div>
//   );
// };

// export default FresherOpportunities;

//05/09

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FresherOpportunities = () => {
  const { user } = useAuth(); // get current user
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    role: "",
    company: "",
    stipend: "",
    description: "",
    link: "",
  });

  const isAdmin = user?.role === "admin";

  // ✅ Fetch all opportunities
  const fetchOpportunities = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities`,
        {
          withCredentials: true,
        }
      );
      setOpportunities(res.data);
    } catch (err) {
      console.error("Fetch opportunities error:", err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // ✅ Add new opportunity
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
      console.error("Add opportunity error:", err);
    }
  };

  // ✅ Delete opportunity
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities/${id}`,
        {
          withCredentials: true,
        }
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
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-6 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        💼 Fresher Opportunities
      </motion.h1>

      {/* Admin Add Form */}
      {isAdmin && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-4 border rounded-lg bg-gray-50 shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Add New Opportunity</h3>
          <input
            type="text"
            placeholder="Role"
            value={newOpportunity.role}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, role: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={newOpportunity.company}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, company: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Stipend"
            value={newOpportunity.stipend}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, stipend: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={newOpportunity.description}
            onChange={(e) =>
              setNewOpportunity({
                ...newOpportunity,
                description: e.target.value,
              })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Link"
            value={newOpportunity.link}
            onChange={(e) =>
              setNewOpportunity({ ...newOpportunity, link: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Opportunity
          </button>
        </form>
      )}

      {/* Opportunities List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((op) => (
          <motion.div
            key={op._id}
            className="bg-white p-4 rounded-lg shadow-lg border hover:border-yellow-400 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {op.role}
            </h3>
            <p className="text-gray-600 mb-1">
              <strong>Company:</strong> {op.company}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Stipend:</strong> {op.stipend || "Not disclosed"}
            </p>
            <p className="text-gray-500 mb-2 text-sm">{op.description}</p>
            <a
              href={op.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Apply / View Details
            </a>

            {/* Delete only for admin */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(op._id)}
                className="mt-2 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
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

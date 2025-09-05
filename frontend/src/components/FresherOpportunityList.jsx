// // src/components/FresherOpportunityList.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const FresherOpportunityList = () => {
//   const [opportunities, setOpportunities] = useState([]);

//   useEffect(() => {
//     const fetchOpportunities = async () => {
//       try {
//         const res = await axios.get("/api/fresher-opportunities");
//         setOpportunities(res.data);
//       } catch (err) {
//         console.error("Error fetching opportunities:", err);
//       }
//     };
//     fetchOpportunities();
//   }, []);

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {opportunities.map((opportunity) => (
//         <motion.div
//           key={opportunity._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           whileHover={{
//             scale: 1.05,
//             boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
//           }}
//           className="bg-white p-4 rounded-lg shadow-lg border hover:border-yellow-400 transition duration-300"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             {opportunity.role}
//           </h3>
//           <p className="text-gray-600 mb-1">
//             <strong>Company:</strong> {opportunity.company}
//           </p>
//           <p className="text-gray-600 mb-1">
//             <strong>Stipend:</strong> {opportunity.stipend || "Not disclosed"}
//           </p>
//           <p className="text-gray-500 mb-2 text-sm">
//             {opportunity.description}
//           </p>
//           <a
//             href={opportunity.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-yellow-500 font-semibold hover:underline"
//           >
//             Apply / View Details
//           </a>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default FresherOpportunityList;

//05/09

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const FresherOpportunityList = ({ adminView = false, fetchOpportunities }) => {
//   const [opportunities, setOpportunities] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities`
//         );
//         setOpportunities(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [fetchOpportunities]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/fresher-opportunities/${id}`,
//         { withCredentials: true }
//       );
//       fetchOpportunities();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {opportunities.map((op) => (
//         <motion.div
//           key={op._id}
//           className="bg-white p-4 rounded-lg shadow-lg border hover:border-yellow-400 transition duration-300"
//           whileHover={{ scale: 1.05 }}
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             {op.role}
//           </h3>
//           <p className="text-gray-600 mb-1">
//             <strong>Company:</strong> {op.company}
//           </p>
//           <p className="text-gray-600 mb-1">
//             <strong>Stipend:</strong> {op.stipend || "Not disclosed"}
//           </p>
//           <p className="text-gray-500 mb-2 text-sm">{op.description}</p>
//           <a
//             href={op.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-yellow-500 font-semibold hover:underline"
//           >
//             Apply / View Details
//           </a>

//           {adminView && (
//             <button
//               onClick={() => handleDelete(op._id)}
//               className="mt-2 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm"
//             >
//               Delete
//             </button>
//           )}
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default FresherOpportunityList;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const FresherOpportunityList = ({ adminView = false, fetchOpportunities }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    role: "",
    company: "",
    stipend: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/fresher-opportunities");
        setOpportunities(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [fetchOpportunities]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/fresher-opportunities/${id}`);
      fetchOpportunities?.(); // optional refresh trigger
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Handle Add Opportunity
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/fresher-opportunities", newOpportunity, {
        withCredentials: true,
      });
      setNewOpportunity({
        role: "",
        company: "",
        stipend: "",
        description: "",
        link: "",
      });
      fetchOpportunities?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Admin Add Form */}
      {adminView && (
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

            {adminView && (
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
    </div>
  );
};

export default FresherOpportunityList;

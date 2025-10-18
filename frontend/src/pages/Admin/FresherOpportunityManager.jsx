// // // src/pages/Admin/FresherOpportunityManager.jsx

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import FresherOpportunityForm from "../../components/admin/FresherOpportunityForm";
// import FresherOpportunityList from "../../components/FresherOpportunityList";
// import axios from "axios";

// const FresherOpportunityManager = () => {
//   const [opportunities, setOpportunities] = useState([]);

//   const fetchOpportunities = async () => {
//     try {
//       const res = await axios.get("/api/fresher-opportunities");
//       setOpportunities(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, []);

//   return (
//     <motion.div
//       className="max-w-5xl mx-auto p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">
//         Admin: Manage Fresher Opportunities
//       </h2>

//       <FresherOpportunityForm fetchOpportunities={fetchOpportunities} />

//       <FresherOpportunityList
//         adminView={true}
//         fetchOpportunities={fetchOpportunities}
//       />
//     </motion.div>
//   );
// };

// export default FresherOpportunityManager;

// src/pages/Admin/FresherOpportunityManager.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FresherOpportunityForm from "../../components/admin/FresherOpportunityForm";
import FresherOpportunityList from "../../components/FresherOpportunityList";
import API from "../../utils/api"; // centralized API

const FresherOpportunityManager = () => {
  const [opportunities, setOpportunities] = useState([]);

  const fetchOpportunities = async () => {
    try {
      const res = await API.get("/api/fresher-opportunities");
      setOpportunities(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch fresher opportunities:", err.message);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Admin: Manage Fresher Opportunities
      </h2>

      {/* Form to add/edit fresher opportunities */}
      <FresherOpportunityForm fetchOpportunities={fetchOpportunities} />

      {/* List of existing opportunities */}
      <FresherOpportunityList
        adminView={true}
        fetchOpportunities={fetchOpportunities}
      />
    </motion.div>
  );
};

export default FresherOpportunityManager;

// src/components/FresherOpportunityList.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const FresherOpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await axios.get("/api/fresher-opportunities");
        setOpportunities(res.data);
      } catch (err) {
        console.error("Error fetching opportunities:", err);
      }
    };
    fetchOpportunities();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {opportunities.map((opportunity) => (
        <motion.div
          key={opportunity._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
          }}
          className="bg-white p-4 rounded-lg shadow-lg border hover:border-yellow-400 transition duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {opportunity.role}
          </h3>
          <p className="text-gray-600 mb-1">
            <strong>Company:</strong> {opportunity.company}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Stipend:</strong> {opportunity.stipend || "Not disclosed"}
          </p>
          <p className="text-gray-500 mb-2 text-sm">
            {opportunity.description}
          </p>
          <a
            href={opportunity.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Apply / View Details
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default FresherOpportunityList;

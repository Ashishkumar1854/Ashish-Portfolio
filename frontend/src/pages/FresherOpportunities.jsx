// src/pages/FresherOpportunities.jsx
import React from "react";
import FresherOpportunityList from "../components/FresherOpportunityList";
import { motion } from "framer-motion";

const FresherOpportunities = () => {
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
      <FresherOpportunityList />
    </motion.div>
  );
};

export default FresherOpportunities;

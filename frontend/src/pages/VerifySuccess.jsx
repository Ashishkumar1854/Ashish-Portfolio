import React from "react";
import { motion } from "framer-motion"; // Optional for animation

const VerifySuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Email Verified Successfully!
        </h2>
        <p className="text-gray-700 mb-2">
          Welcome to <strong>Ashish Kumar Community</strong> 🚀
        </p>

        <ul className="text-left text-sm text-gray-600 mt-4 space-y-1">
          <li>• 🔔 Internship & Job Alerts</li>
          <li>• 📘 Premium Tech Blogs</li>
          <li>• 💼 Freelancing & Gigs</li>
        </ul>

        <a
          href="/"
          className="inline-block mt-6 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
        >
          Go to Dashboard
        </a>
      </motion.div>
    </div>
  );
};

export default VerifySuccess;

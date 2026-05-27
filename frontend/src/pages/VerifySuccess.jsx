import React from "react";
import { motion } from "framer-motion";

const VerifySuccess = () => {
  return (
    <div className="bg-surface-deep min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 rounded-2xl max-w-md w-full text-center border-t-4 border-t-tertiary"
      >
        <span className="material-symbols-outlined text-tertiary text-5xl mb-4">check_circle</span>
        <h2 className="text-2xl font-bold text-on-surface mb-4">
          Email Verified Successfully!
        </h2>
        <p className="text-text-dim mb-6">
          Welcome to the <strong>Ashish Kumar Community</strong> 🚀
        </p>

        <ul className="text-left text-sm text-text-dim mt-4 space-y-3 mb-8 bg-surface-elevated p-4 rounded-xl border border-border-subtle">
          <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">notifications</span> Internship & Job Alerts</li>
          <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">menu_book</span> Premium Tech Blogs</li>
          <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">work</span> Freelancing & Gigs</li>
        </ul>

        <a
          href="/"
          className="w-full btn-primary block rounded py-3"
        >
          Go to Dashboard
        </a>
      </motion.div>
    </div>
  );
};

export default VerifySuccess;

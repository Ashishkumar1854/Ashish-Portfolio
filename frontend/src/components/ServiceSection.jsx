//05/00

// src/components/ServiceSection.jsx
import React from "react";
import { motion } from "framer-motion";

const ServiceSection = ({ services = [], onDelete, user }) => {
  if (!services.length) {
    return (
      <p className="text-center text-gray-500 italic">No services available.</p>
    );
  }

  const iconClasses = [
    "bg-cyan-500/10 text-cyan-600",
    "bg-fuchsia-500/10 text-fuchsia-600",
    "bg-emerald-500/10 text-emerald-600",
    "bg-amber-500/10 text-amber-600",
    "bg-indigo-500/10 text-indigo-600",
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <motion.div
          key={service._id || i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group relative rounded-2xl bg-gradient-to-r from-slate-200/60 via-white to-slate-200/60 p-[1px] shadow-[0_18px_36px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_48px_rgba(15,23,42,0.16)] transition"
        >
          <div className="relative h-full rounded-2xl bg-white p-6">
            <div
              className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${iconClasses[i % iconClasses.length]}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 7h16M7 4h10M7 12h10M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h4 className="mt-4 font-semibold text-lg text-slate-900">
              {service.title || "Untitled Service"}
            </h4>

            <div
              className="mt-3 prose prose-sm prose-slate max-w-full"
              dangerouslySetInnerHTML={{
                __html:
                  service.description ||
                  "<p class='text-gray-500 italic'>No description provided.</p>",
              }}
            />

            <div className="mt-5 h-0.5 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-70" />

            {user?.role === "admin" && (
              <button
                onClick={() => onDelete(service._id)}
                className="absolute top-3 right-3 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-red-300 hover:text-red-600 transition"
              >
                Delete
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceSection;

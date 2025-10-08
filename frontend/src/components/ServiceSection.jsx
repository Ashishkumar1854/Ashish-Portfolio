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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service, i) => (
        <motion.div
          key={service._id || i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h4 className="font-semibold text-lg mb-3 text-gray-800">
            {service.title || "Untitled Service"}
          </h4>

          {/* Styled content display */}
          <div
            className="prose prose-gray max-w-full"
            dangerouslySetInnerHTML={{
              __html:
                service.description ||
                "<p class='text-gray-500 italic'>No description provided.</p>",
            }}
          />

          {user?.role === "admin" && (
            <button
              onClick={() => onDelete(service._id)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceSection;

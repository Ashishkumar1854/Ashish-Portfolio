import React from "react";
import { motion } from "framer-motion";

const ContactSection = ({ contacts = [], onDelete, user }) => {
  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded shadow hover:shadow-md transition mb-6"
      >
        {contacts.length === 0 ? (
          <p className="text-gray-500">No contact details available</p>
        ) : (
          contacts.map((contact, i) => (
            <p key={i} className="mb-1 text-sm sm:text-base">
              <strong>{contact.type}:</strong> {contact.value}
            </p>
          ))
        )}
      </motion.div>

      {user?.role === "admin" &&
        contacts.map((contact, i) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded shadow hover:shadow-md transition mb-4 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Type:</strong> {contact.type}
              </p>
              <p>
                <strong>Value:</strong> {contact.value}
              </p>
            </div>
            <button
              onClick={() => onDelete(contact._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </motion.div>
        ))}
    </section>
  );
};

export default ContactSection;

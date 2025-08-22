// import React from "react";
// import { motion } from "framer-motion";

// const ContactSection = ({ contacts, onDelete, user }) => {
//   // Group contacts by type
//   const grouped = contacts.reduce((acc, item) => {
//     acc[item.type] = acc[item.type] || [];
//     acc[item.type].push(item.value);
//     return acc;
//   }, {});

//   return (
//     <section className="my-10">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         📞 Contact Information
//       </h2>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white p-6 rounded shadow hover:shadow-md transition mb-6"
//       >
//         {grouped.phone && (
//           <p>
//             <strong>Phones:</strong> {grouped.phone.join(", ")}
//           </p>
//         )}
//         {grouped.email && (
//           <p>
//             <strong>Emails:</strong> {grouped.email.join(", ")}
//           </p>
//         )}
//         <div className="flex flex-wrap gap-4 mt-4">
//           {grouped.linkedin && (
//             <a
//               href={grouped.linkedin[0]}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               LinkedIn
//             </a>
//           )}
//           {grouped.github && (
//             <a
//               href={grouped.github[0]}
//               target="_blank"
//               className="text-gray-800 underline"
//             >
//               GitHub
//             </a>
//           )}
//           {grouped.twitter && (
//             <a
//               href={grouped.twitter[0]}
//               target="_blank"
//               className="text-blue-400 underline"
//             >
//               Twitter
//             </a>
//           )}
//           {grouped.instagram && (
//             <a
//               href={grouped.instagram[0]}
//               target="_blank"
//               className="text-pink-500 underline"
//             >
//               Instagram
//             </a>
//           )}
//         </div>
//       </motion.div>

//       {/* Admin Delete Buttons */}
//       {user?.role === "admin" &&
//         contacts.map((contact, i) => (
//           <motion.div
//             key={contact._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="bg-white p-4 rounded shadow hover:shadow-md transition mb-4"
//           >
//             <p>
//               <strong>Type:</strong> {contact.type}
//             </p>
//             <p>
//               <strong>Value:</strong> {contact.value}
//             </p>
//             <button
//               onClick={() => onDelete(contact._id)}
//               className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </motion.div>
//         ))}
//     </section>
//   );
// };

// export default ContactSection;

// 16August

// frontend/src/components/ContactSection.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const ContactSection = ({ contacts, onDelete, user }) => {
//   // Group contacts by type
//   const grouped = contacts.reduce((acc, item) => {
//     acc[item.type] = acc[item.type] || [];
//     acc[item.type].push(item.value);
//     return acc;
//   }, {});

//   return (
//     <section className="my-10">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         📞 Contact Information
//       </h2>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white p-6 rounded shadow hover:shadow-md transition mb-6"
//       >
//         {grouped.phone && (
//           <p>
//             <strong>Phones:</strong> {grouped.phone.join(", ")}
//           </p>
//         )}
//         {grouped.email && (
//           <p>
//             <strong>Emails:</strong> {grouped.email.join(", ")}
//           </p>
//         )}
//         {grouped.linkedin && (
//           <p>
//             <strong>LinkedIn:</strong> {grouped.linkedin.join(", ")}
//           </p>
//         )}
//         {grouped.github && (
//           <p>
//             <strong>GitHub:</strong> {grouped.github.join(", ")}
//           </p>
//         )}
//         {grouped.twitter && (
//           <p>
//             <strong>Twitter:</strong> {grouped.twitter.join(", ")}
//           </p>
//         )}
//         {grouped.instagram && (
//           <p>
//             <strong>Instagram:</strong> {grouped.instagram.join(", ")}
//           </p>
//         )}
//       </motion.div>

//       {/* Admin Delete Buttons */}
//       {user?.role === "admin" &&
//         contacts.map((contact, i) => (
//           <motion.div
//             key={contact._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="bg-white p-4 rounded shadow hover:shadow-md transition mb-4 flex justify-between items-center"
//           >
//             <div>
//               <p>
//                 <strong>Type:</strong> {contact.type}
//               </p>
//               <p>
//                 <strong>Value:</strong> {contact.value}
//               </p>
//             </div>
//             <button
//               onClick={() => onDelete(contact._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </motion.div>
//         ))}
//     </section>
//   );
// };

// export default ContactSection;

//21/07

import React from "react";
import { motion } from "framer-motion";

const ContactSection = ({ contacts = [], onDelete, user }) => {
  const grouped = contacts.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item.value);
    return acc;
  }, {});

  return (
    <section className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📞 Contact Information
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded shadow hover:shadow-md transition mb-6"
      >
        {grouped.phone && (
          <p>
            <strong>Phones:</strong> {grouped.phone.join(", ")}
          </p>
        )}
        {grouped.email && (
          <p>
            <strong>Emails:</strong> {grouped.email.join(", ")}
          </p>
        )}
        {grouped.linkedin && (
          <p>
            <strong>LinkedIn:</strong> {grouped.linkedin.join(", ")}
          </p>
        )}
        {grouped.github && (
          <p>
            <strong>GitHub:</strong> {grouped.github.join(", ")}
          </p>
        )}
        {grouped.twitter && (
          <p>
            <strong>Twitter:</strong> {grouped.twitter.join(", ")}
          </p>
        )}
        {grouped.instagram && (
          <p>
            <strong>Instagram:</strong> {grouped.instagram.join(", ")}
          </p>
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

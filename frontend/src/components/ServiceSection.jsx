// import React from "react";
// import { motion } from "framer-motion";

// const ServiceSection = ({ services, onDelete, user }) => {
//   return (
//     <section className="my-10">
//       <h2 className="text-3xl font-bold mb-6 text-center">🚀 Our Services</h2>
//       <ul className="space-y-4">
//         {services.map((service, i) => (
//           <motion.li
//             key={service._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="bg-white p-4 rounded shadow hover:shadow-md transition"
//           >
//             <h3 className="text-xl font-semibold">{service.title}</h3>
//             {service.description && (
//               <p className="text-gray-600">{service.description}</p>
//             )}
//             {user?.role === "admin" && (
//               <button
//                 onClick={() => onDelete(service._id)}
//                 className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             )}
//           </motion.li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default ServiceSection;

// 16August

// import React from "react";
// import { motion } from "framer-motion";

// const ServiceSection = ({ services, onDelete, user }) => {
//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       {services.map((service, i) => (
//         <motion.div
//           key={service._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.1 }}
//           className="bg-white p-4 rounded shadow hover:shadow-md transition relative"
//         >
//           <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
//           <p className="text-gray-600">{service.description}</p>
//           {user?.role === "admin" && (
//             <button
//               onClick={() => onDelete(service._id)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           )}
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ServiceSection;

//21/07

// import React from "react";
// import { motion } from "framer-motion";

// const ServiceSection = ({ services = [], onDelete, user }) => {
//   if (!services.length) return <p>No services available.</p>;

//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       {services.map((service, i) => (
//         <motion.div
//           key={service._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.1 }}
//           className="bg-white p-4 rounded shadow hover:shadow-md transition relative"
//         >
//           <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
//           <p className="text-gray-600">{service.description}</p>
//           {user?.role === "admin" && (
//             <button
//               onClick={() => onDelete(service._id)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           )}
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ServiceSection;

//05/00

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
          <h4 className="font-semibold text-lg mb-2 text-gray-800">
            {service.title || "Untitled Service"}
          </h4>
          <p className="text-gray-600">
            {service.description || "No description provided."}
          </p>

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

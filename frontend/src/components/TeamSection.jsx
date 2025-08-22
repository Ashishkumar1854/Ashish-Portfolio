// // Updated TeamSection.jsx (Now Includes Delete Functionality)
// import React from "react";
// import { motion } from "framer-motion";

// const TeamSection = ({ teams, onDelete, user }) => {
//   const sortedTeams = [...teams].sort((a, b) => {
//     if (a.name.toLowerCase().includes("binodai")) return -1;
//     if (b.name.toLowerCase().includes("binodai")) return 1;
//     return 0;
//   });

//   const grouped = sortedTeams.reduce((acc, member) => {
//     acc[member.role] = acc[member.role] || [];
//     acc[member.role].push(member);
//     return acc;
//   }, {});

//   return (
//     <div>
//       {Object.keys(grouped).map((role) => (
//         <div key={role} className="mb-10">
//           <h3 className="text-2xl font-bold mb-4 capitalize">{role} Team</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {grouped[role].map((member, i) => (
//               <motion.div
//                 key={member._id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transition"
//               >
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
//                 />
//                 <h4 className="font-semibold text-lg">{member.name}</h4>
//                 <p className="text-sm text-gray-600">{member.bio}</p>
//                 <div className="flex justify-center space-x-2 mt-2">
//                   {member.socials.linkedin && (
//                     <a
//                       href={member.socials.linkedin}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600"
//                     >
//                       LinkedIn
//                     </a>
//                   )}
//                   {member.socials.github && (
//                     <a
//                       href={member.socials.github}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-800"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                   {member.socials.twitter && (
//                     <a
//                       href={member.socials.twitter}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-400"
//                     >
//                       Twitter
//                     </a>
//                   )}
//                 </div>
//                 {user?.role === "admin" && (
//                   <button
//                     onClick={() => onDelete(member._id)}
//                     className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TeamSection;

//16August

// import React from "react";
// import { motion } from "framer-motion";

// const TeamSection = ({ teams, onDelete, user }) => {
//   const grouped = teams.reduce((acc, member) => {
//     acc[member.role] = acc[member.role] || [];
//     acc[member.role].push(member);
//     return acc;
//   }, {});

//   return (
//     <div>
//       {Object.keys(grouped).map((role) => (
//         <div key={role} className="mb-10">
//           <h3 className="text-2xl font-bold mb-4 capitalize">{role} Team</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {grouped[role].map((member, i) => (
//               <motion.div
//                 key={member._id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transition"
//               >
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
//                 />
//                 <h4 className="font-semibold text-lg">{member.name}</h4>
//                 <p className="text-sm text-gray-600">{member.bio}</p>
//                 <div className="flex justify-center space-x-2 mt-2">
//                   {member.socials.linkedin && (
//                     <a
//                       href={member.socials.linkedin}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600"
//                     >
//                       LinkedIn
//                     </a>
//                   )}
//                   {member.socials.github && (
//                     <a
//                       href={member.socials.github}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-800"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                   {member.socials.twitter && (
//                     <a
//                       href={member.socials.twitter}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-400"
//                     >
//                       Twitter
//                     </a>
//                   )}
//                 </div>
//                 {user?.role === "admin" && (
//                   <button
//                     onClick={() => onDelete(member._id)}
//                     className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TeamSection;

//21/07/2025

import React from "react";
import { motion } from "framer-motion";

const TeamSection = ({ teams = [], onDelete, user }) => {
  const grouped = teams.reduce((acc, member) => {
    acc[member.role] = acc[member.role] || [];
    acc[member.role].push(member);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(grouped).map((role) => (
        <div key={role} className="mb-10">
          <h3 className="text-2xl font-bold mb-4 capitalize">{role} Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {grouped[role].map((member, i) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.bio}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-800"
                    >
                      GitHub
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400"
                    >
                      Twitter
                    </a>
                  )}
                </div>
                {user?.role === "admin" && (
                  <button
                    onClick={() => onDelete(member._id)}
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;

// import React, { useState } from "react";
// import ProjectSection from "../components/ProjectSection";
// import ProjectForm from "../components/admin/ProjectForm";
// import { useAuth } from "../context/AuthContext";

// const Project = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.role === "admin";
//   const [updateTrigger, setUpdateTrigger] = useState(false); // optional if you want to force re-render

//   return (
//     <div>
//       {isAdmin && (
//         <ProjectForm
//           onAdd={() => setUpdateTrigger(!updateTrigger)} // optional trigger
//         />
//       )}
//       <ProjectSection key={updateTrigger} /> {/* re-fetch projects on add */}
//     </div>
//   );
// };

// export default Project;

import React, { useState } from "react";
import ProjectSection from "../components/ProjectSection";
import ProjectForm from "../components/admin/ProjectForm";
import { useAuth } from "../context/AuthContext";

const Project = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL;
  const [updateTrigger, setUpdateTrigger] = useState(false);

  return (
    <div className="p-6">
      {isAdmin && (
        <ProjectForm
          user={user}
          onAdd={() => setUpdateTrigger(!updateTrigger)}
        />
      )}
      <ProjectSection updateTrigger={updateTrigger} />
    </div>
  );
};

export default Project;

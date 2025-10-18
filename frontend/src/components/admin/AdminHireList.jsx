// // components/admin/AdminHireList.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import HireModal from "./HireModal";

// const AdminHireList = () => {
//   const [hires, setHires] = useState([]);
//   const [selectedHire, setSelectedHire] = useState(null);

//   const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

//   const fetchHires = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/admin/hires`, {
//         withCredentials: true,
//       });
//       setHires(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchHires();
//   }, []);

//   return (
//     <div>
//       {hires.length === 0 && <p>No pending hires.</p>}
//       {hires.map((hire) => (
//         <div
//           key={hire._id}
//           className="p-4 border rounded mb-3 cursor-pointer hover:bg-gray-100"
//           onClick={() => setSelectedHire(hire)}
//         >
//           <p>
//             <b>Name:</b> {hire.name}
//           </p>
//           <p>
//             <b>Email:</b> {hire.email}
//           </p>
//           <p>
//             <b>Project:</b> {hire.projectType}
//           </p>
//           <p>
//             <b>Status:</b> {hire.status}
//           </p>
//         </div>
//       ))}

//       {selectedHire && (
//         <HireModal
//           hire={selectedHire}
//           onClose={() => {
//             setSelectedHire(null);
//             fetchHires();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminHireList;

import React, { useEffect, useState } from "react";
import HireModal from "./HireModal";
import API from "../../utils/api"; // ✅ unified API

const AdminHireList = () => {
  const [hires, setHires] = useState([]);
  const [selectedHire, setSelectedHire] = useState(null);

  const fetchHires = async () => {
    try {
      const res = await API.get("/api/admin/hires"); // ✅ replaced axios
      setHires(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHires();
  }, []);

  return (
    <div>
      {hires.length === 0 && <p>No pending hires.</p>}
      {hires.map((hire) => (
        <div
          key={hire._id}
          className="p-4 border rounded mb-3 cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedHire(hire)}
        >
          <p>
            <b>Name:</b> {hire.name}
          </p>
          <p>
            <b>Email:</b> {hire.email}
          </p>
          <p>
            <b>Project:</b> {hire.projectType}
          </p>
          <p>
            <b>Status:</b> {hire.status}
          </p>
        </div>
      ))}

      {selectedHire && (
        <HireModal
          hire={selectedHire}
          onClose={() => {
            setSelectedHire(null);
            fetchHires();
          }}
        />
      )}
    </div>
  );
};

export default AdminHireList;

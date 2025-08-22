// import { useState } from "react";
// import axios from "axios";

// const ServiceForm = ({ onAdd }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/about/service`,
//         { title, description }
//       );
//       onAdd(res.data);
//       setTitle("");
//       setDescription("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-3 border p-4 rounded shadow-md mb-6"
//     >
//       <input
//         type="text"
//         placeholder="Service Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Add Service
//       </button>
//     </form>
//   );
// };

// export default ServiceForm;

//21/08

import { useState } from "react";
import axios from "axios";

const ServiceForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/about/service`,
        { title, description }
      );
      onAdd(res.data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border p-4 rounded shadow-md mb-6"
    >
      <input
        type="text"
        placeholder="Service Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Service
      </button>
    </form>
  );
};

export default ServiceForm;

// // src/components/ServiceForm.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

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
//     <div className="grid md:grid-cols-2 gap-6">
//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-3 border p-4 rounded shadow-md"
//       >
//         <input
//           type="text"
//           placeholder="Service Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         <ReactQuill
//           theme="snow"
//           value={description}
//           onChange={setDescription}
//           placeholder="Service Description"
//         />

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Add Service
//         </button>
//       </form>

//       {/* Live Preview */}
//       <div className="border p-4 rounded shadow-md bg-gray-50">
//         <h3 className="font-bold text-lg mb-3">{title || "Service Preview"}</h3>
//         <div
//           className="prose max-w-full"
//           dangerouslySetInnerHTML={{
//             __html: description || "<p>No description yet</p>",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ServiceForm;

// src/components/ServiceForm.jsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API from "../../utils/api"; // ✅ correct path

const ServiceForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/about/service", {
        title,
        description,
      });
      onAdd(data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Add Service Error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to add service");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 border p-4 rounded shadow-md"
      >
        <input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="Service Description"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Service
        </button>
      </form>

      {/* Live Preview */}
      <div className="border p-4 rounded shadow-md bg-gray-50">
        <h3 className="font-bold text-lg mb-3">{title || "Service Preview"}</h3>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{
            __html: description || "<p>No description yet</p>",
          }}
        />
      </div>
    </div>
  );
};

export default ServiceForm;

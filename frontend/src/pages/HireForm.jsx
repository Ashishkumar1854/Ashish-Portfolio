// //frontend/src/pages/HireForm.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const HireForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     projectType: "",
//     budget: "",
//     description: "",
//   });

//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle file select
//   const handleFileChange = (e) => {
//     setDocument(e.target.files[0]);
//   };

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });
//       if (document) {
//         data.append("document", document);
//       }

//       const res = await axios.post("/api/hire", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(res.data);

//       setMessage("✅ Request submitted successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         projectType: "",
//         budget: "",
//         description: "",
//       });
//       setDocument(null);
//     } catch (error) {
//       console.error("❌ Hire request failed:", error);
//       setMessage("❌ Something went wrong, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           💼 Hire a Freelancer
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 p-2 text-center rounded ${
//               message.includes("✅")
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* Name */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         {/* Email */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         {/* Phone */}
//         <input
//           type="text"
//           name="phone"
//           placeholder="Your Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         {/* Project Type */}
//         <select
//           name="projectType"
//           value={formData.projectType}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         >
//           <option value="">Select Project Type</option>
//           <option value="Web Development">Web Developmentst</option>
//           <option value="App Development">App Developmensdt</option>
//           <option value="Content Writing">Content Writing</option>
//           <option value="Design">Design</option>
//           <option value="Other">Other</option>
//         </select>

//         {/* Budget */}
//         <input
//           type="text"
//           name="budget"
//           placeholder="Your Budget"
//           value={formData.budget}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Project Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           rows="4"
//           required
//         ></textarea>

//         {/* File Upload */}
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="w-full mb-4"
//           accept=".pdf,.doc,.docx"
//         />

//         {/* Buttons */}
//         <div className="flex justify-between">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//           <button
//             type="reset"
//             onClick={() =>
//               setFormData({
//                 name: "",
//                 email: "",
//                 phone: "",
//                 projectType: "",
//                 budget: "",
//                 description: "",
//               })
//             }
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default HireForm;

// // frontend/src/pages/HireForm.jsx
// import React, { useState, useImperativeHandle, forwardRef } from "react";
// import axios from "axios";
// import { X } from "lucide-react"; // ✅ Close icon

// // ✅ forwardRef allows parent (Assistant page) to control open/close
// const HireForm = forwardRef((_, ref) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     projectType: "",
//     budget: "",
//     description: "",
//   });

//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   // ✅ allow parent to trigger open/close
//   useImperativeHandle(ref, () => ({
//     openForm: () => setShowForm(true),
//     closeForm: () => setShowForm(false),
//   }));

//   // ✅ Handle input changes
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => setDocument(e.target.files[0]);

//   // ✅ Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//       if (document) data.append("document", document);

//       const res = await axios.post("/api/hire", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log(res.data);
//       setMessage("✅ Request submitted successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         projectType: "",
//         budget: "",
//         description: "",
//       });
//       setDocument(null);
//     } catch (error) {
//       console.error("❌ Hire request failed:", error);
//       setMessage("❌ Something went wrong, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!showForm) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6"
//       >
//         {/* ✅ Close Icon */}
//         <button
//           type="button"
//           onClick={() => setShowForm(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
//           title="Close Form"
//         >
//           <X size={22} />
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           💼 Hire a Freelancer
//         </h2>

//         {message && (
//           <p
//             className={`mb-4 p-2 text-center rounded ${
//               message.includes("✅")
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* Form Fields */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Your Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <select
//           name="projectType"
//           value={formData.projectType}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         >
//           <option value="">Select Project Type</option>
//           <option value="Web Development">Web Development</option>
//           <option value="App Development">App Development</option>
//           <option value="Content Writing">Content Writing</option>
//           <option value="Design">Design</option>
//           <option value="Other">Other</option>
//         </select>

//         <input
//           type="text"
//           name="budget"
//           placeholder="Your Budget"
//           value={formData.budget}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Project Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           rows="4"
//           required
//         ></textarea>

//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="w-full mb-4"
//           accept=".pdf,.doc,.docx"
//         />

//         {/* Buttons */}
//         <div className="flex justify-between">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//           <button
//             type="reset"
//             onClick={() =>
//               setFormData({
//                 name: "",
//                 email: "",
//                 phone: "",
//                 projectType: "",
//                 budget: "",
//                 description: "",
//               })
//             }
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default HireForm;

import React, { useState } from "react";
import axios from "axios";

const HireForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setDocument(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (document) data.append("document", document);

      const res = await axios.post("/api/hire", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      setMessage("✅ Request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        description: "",
      });
      setDocument(null);
    } catch (error) {
      console.error("❌ Hire request failed:", error);
      setMessage("❌ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        {/* ❌ Close button */}
        <button
          onClick={() => onClose()}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          💼 Hire a Freelancer
        </h2>

        {message && (
          <p
            className={`mb-4 p-2 text-center rounded ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          >
            <option value="">Select Project Type</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Design">Design</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="budget"
            placeholder="Your Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            rows="4"
            required
          ></textarea>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full mb-4"
            accept=".pdf,.doc,.docx"
          />

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  projectType: "",
                  budget: "",
                  description: "",
                });
                setDocument(null);
                onClose();
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HireForm;

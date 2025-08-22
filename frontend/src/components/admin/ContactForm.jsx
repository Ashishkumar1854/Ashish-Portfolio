// import { useState } from "react";
// import axios from "axios";

// const ContactForm = ({ onAdd }) => {
//   const [type, setType] = useState("");
//   const [value, setValue] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/about/contact`,
//         { type, value }
//       );
//       onAdd(res.data);
//       setType("");
//       setValue("");
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
//         placeholder="Type (phone/email/linkedin/etc)"
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="Value"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Add Contact
//       </button>
//     </form>
//   );
// };

// export default ContactForm;

//21/08

import { useState } from "react";
import axios from "axios";

const ContactForm = ({ onAdd }) => {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/about/contact`,
        { type, value }
      );
      onAdd(res.data);
      setType("");
      setValue("");
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
        placeholder="Type (phone/email/linkedin/etc)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;

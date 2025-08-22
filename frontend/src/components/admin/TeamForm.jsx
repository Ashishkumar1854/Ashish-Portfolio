// import { useState } from "react";
// import axios from "axios";

// const TeamForm = ({ onAdd }) => {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [bio, setBio] = useState("");
//   const [image, setImage] = useState("");
//   const [linkedin, setLinkedin] = useState("");
//   const [github, setGithub] = useState("");
//   const [twitter, setTwitter] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/about/team`,
//         {
//           name,
//           role,
//           bio,
//           image,
//           socials: { linkedin, github, twitter },
//         }
//       );
//       onAdd(res.data);
//       setName("");
//       setRole("");
//       setBio("");
//       setImage("");
//       setLinkedin("");
//       setGithub("");
//       setTwitter("");
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
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="Role"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <textarea
//         placeholder="Bio"
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="Image URL"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="LinkedIn"
//         value={linkedin}
//         onChange={(e) => setLinkedin(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="GitHub"
//         value={github}
//         onChange={(e) => setGithub(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         type="text"
//         placeholder="Twitter"
//         value={twitter}
//         onChange={(e) => setTwitter(e.target.value)}
//         className="w-full border p-2 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Add Team Member
//       </button>
//     </form>
//   );
// };

// export default TeamForm;

//21/07
import { useState } from "react";
import axios from "axios";

const TeamForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/about/team`,
        {
          name,
          role,
          bio,
          image,
          socials: { linkedin, github, twitter },
        }
      );
      onAdd(res.data);
      setName("");
      setRole("");
      setBio("");
      setImage("");
      setLinkedin("");
      setGithub("");
      setTwitter("");
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
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="LinkedIn"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="GitHub"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Twitter"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Team Member
      </button>
    </form>
  );
};

export default TeamForm;

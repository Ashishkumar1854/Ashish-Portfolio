// // // src/components/HeroSection.jsx

// //.............17/07/2025 ........

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify"; // ✅ toast added
// import { useAuth } from "../context/AuthContext"; // ✅ added

// const HeroSection = () => {
//   const { user } = useAuth(); // ✅ user from context
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState({ title: "", link: "" });
//   const scrollRef = useRef(null);

//   // ⏩ Auto-scroll
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollLeft += 1;
//       }
//     }, 25);
//     return () => clearInterval(interval);
//   }, []);

//   // 📦 Fetch Recent Posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/api/home/recentPost`
//         );
//         setPosts(res.data.data?.content || []);
//       } catch (err) {
//         console.error("Fetch Recent Posts Error:", err);
//         toast.error("❌ Failed to load recent posts.");
//       }
//     };
//     fetchPosts();
//   }, []);

//   // ➕ Add new post
//   const handleAdd = async () => {
//     if (!newPost.title || !newPost.link) {
//       toast.warn("⚠️ Title and Link required");
//       return;
//     }

//     try {
//       const updated = [...posts, newPost];
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "recentPost",
//         content: updated,
//       });
//       setPosts(updated);
//       setNewPost({ title: "", link: "" });
//       toast.success("✅ Post added successfully");
//     } catch (err) {
//       console.error("Add Post Error:", err);
//       toast.error("❌ Failed to add post");
//     }
//   };

//   // 🗑️ Delete post
//   const handleDelete = async (index) => {
//     try {
//       const updated = posts.filter((_, i) => i !== index);
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/home`, {
//         section: "recentPost",
//         content: updated,
//       });
//       setPosts(updated);
//       toast.info("🗑️ Post deleted");
//     } catch (err) {
//       console.error("Delete Post Error:", err);
//       toast.error("❌ Failed to delete post");
//     }
//   };

//   return (
//     <section className="space-y-12 mt-10 text-center" id="hero">
//       {/* 🧠 Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700">
//           🚀 Welcome to Ashish's Portfolio
//         </h1>
//         <h2 className="text-xl mt-2 text-gray-700 font-medium">
//           Innovating Solutions. Crafting Digital Experiences.
//         </h2>
//         <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
//           Explore my journey through cutting-edge projects, AI/ML innovations,
//           and full-stack development. Dive into recent highlights below 👇
//         </p>
//       </motion.div>

//       {/* 🌀 Scrollable Highlights */}
//       <div
//         ref={scrollRef}
//         className="overflow-x-auto whitespace-nowrap flex gap-6 px-4 py-6 scroll-smooth bg-gradient-to-br from-yellow-50 via-white to-purple-50 rounded-xl shadow-inner"
//       >
//         {posts.map((post, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="min-w-[260px] max-w-sm p-5 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-purple-200 flex-shrink-0"
//           >
//             <h3 className="text-lg font-bold text-purple-800 mb-2 truncate">
//               {post.title}
//             </h3>
//             <a
//               href={post.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline text-sm break-all"
//             >
//               {post.link}
//             </a>
//             {user?.role === "admin" && (
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleDelete(i);
//                 }}
//                 className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* 🛠️ Admin Add Panel */}
//       {user?.role === "admin" && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="bg-white p-6 rounded-2xl shadow-md mt-8 space-y-4 max-w-md mx-auto border border-gray-200"
//         >
//           <h3 className="font-bold text-lg text-gray-800">
//             ➕ Add New Recent Post
//           </h3>
//           <input
//             type="text"
//             placeholder="Post Title"
//             value={newPost.title}
//             onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//             className="w-full border rounded px-3 py-2"
//           />
//           <input
//             type="url"
//             placeholder="Post Link"
//             value={newPost.link}
//             onChange={(e) => setNewPost({ ...newPost, link: e.target.value })}
//             className="w-full border rounded px-3 py-2"
//           />
//           <button
//             onClick={handleAdd}
//             className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             ✅ Add Post
//           </button>
//         </motion.div>
//       )}
//     </section>
//   );
// };

// export default HeroSection;

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // ✅ toast added
import { useAuth } from "../context/AuthContext"; // ✅ added
import API from "../utils/api"; // ✅ centralized axios instance

const HeroSection = () => {
  const { user } = useAuth(); // ✅ user from context
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", link: "" });
  const scrollRef = useRef(null);

  // ⏩ Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // 📦 Fetch Recent Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/api/home/recentPost");
        setPosts(res.data.data?.content || []);
      } catch (err) {
        console.error("Fetch Recent Posts Error:", err);
        toast.error("❌ Failed to load recent posts.");
      }
    };
    fetchPosts();
  }, []);

  // ➕ Add new post
  const handleAdd = async () => {
    if (!newPost.title || !newPost.link) {
      toast.warn("⚠️ Title and Link required");
      return;
    }

    try {
      const updated = [...posts, newPost];
      await API.post("/api/home", {
        section: "recentPost",
        content: updated,
      });
      setPosts(updated);
      setNewPost({ title: "", link: "" });
      toast.success("✅ Post added successfully");
    } catch (err) {
      console.error("Add Post Error:", err);
      toast.error("❌ Failed to add post");
    }
  };

  // 🗑️ Delete post
  const handleDelete = async (index) => {
    try {
      const updated = posts.filter((_, i) => i !== index);
      await API.post("/api/home", {
        section: "recentPost",
        content: updated,
      });
      setPosts(updated);
      toast.info("🗑️ Post deleted");
    } catch (err) {
      console.error("Delete Post Error:", err);
      toast.error("❌ Failed to delete post");
    }
  };

  return (
    <section className="space-y-12 mt-10 text-center" id="hero">
      {/* 🧠 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700">
          🚀 Welcome to Ashish's Portfolio
        </h1>
        <h2 className="text-xl mt-2 text-gray-700 font-medium">
          Innovating Solutions. Crafting Digital Experiences.
        </h2>
        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Explore my journey through cutting-edge projects, AI/ML innovations,
          and full-stack development. Dive into recent highlights below 👇
        </p>
      </motion.div>

      {/* 🌀 Scrollable Highlights */}
      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap flex gap-6 px-4 py-6 scroll-smooth bg-gradient-to-br from-yellow-50 via-white to-purple-50 rounded-xl shadow-inner"
      >
        {posts.map((post, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="min-w-[260px] max-w-sm p-5 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-purple-200 flex-shrink-0"
          >
            <h3 className="text-lg font-bold text-purple-800 mb-2 truncate">
              {post.title}
            </h3>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm break-all"
            >
              {post.link}
            </a>
            {user?.role === "admin" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(i);
                }}
                className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* 🛠️ Admin Add Panel */}
      {user?.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-md mt-8 space-y-4 max-w-md mx-auto border border-gray-200"
        >
          <h3 className="font-bold text-lg text-gray-800">
            ➕ Add New Recent Post
          </h3>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="url"
            placeholder="Post Link"
            value={newPost.link}
            onChange={(e) => setNewPost({ ...newPost, link: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ✅ Add Post
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;

// // // // src/components/HeroSection.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify"; // ✅ toast added
// import { useAuth } from "../context/AuthContext"; // ✅ added
// import API from "../utils/api"; // ✅ centralized axios instance

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
//         const res = await API.get("/api/home/recentPost");
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
//       await API.post("/api/home", {
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
//       await API.post("/api/home", {
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

//02 december

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

  //   return (
  //     <section className="space-y-12 mt-10 text-center" id="hero">
  //       {/* 🧠 Header */}
  //       <motion.div
  //         initial={{ opacity: 0, y: -20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ delay: 0.2 }}
  //       >
  //         <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700">
  //           Welcome to Ashish's Portfolio
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

  //with bgr image
  return (
    <section id="hero" className="space-y-8 mt-14">
      <div className="max-w-6xl mx-auto px-17">
        {/* HERO grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: IMAGE (no badge) */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[66vh] sm:h-[78vh] md:h-[70vh] lg:h-[78vh]">
            <img
              src="/bgr_img.png"
              alt="Ashish"
              className="w-full h-full object-cover block"
            />
            {/* soft vignette to give depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/8 pointer-events-none" />
          </div>

          {/* RIGHT: attractive frosted card */}
          <div className="flex items-center">
            <div className="relative z-10 w-full">
              <div className="mx-auto max-w-xl bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,24,40,0.08)] border border-white/40">
                {/* header with gradient accent */}
                <div className="mb-4">
                  <div className="inline-block px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-xs shadow-sm">
                    Hello, I'm Ashish Kumar
                  </div>

                  <h1 className="mt-4 text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    Welcome to my Portfolio
                  </h1>

                  <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
                    Building products, ML prototypes and delightful web
                    experiences.
                  </p>
                </div>

                {/* message-style content: cleaner icons instead of letters */}
                <div className="space-y-4">
                  {/* bubble 1 */}
                  <div className="flex items-start gap-3">
                    {/* icon chip */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white shadow-sm">
                      {/* simple laptop SVG */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 5h18v10H3z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 21h10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 text-gray-800">
                      Hi I build fast, reliable web apps and AI prototypes that
                      scale.
                      <div className="text-xs text-gray-400 mt-1">
                        Full-stack , AI/ML
                      </div>
                    </div>
                  </div>

                  {/* bubble 2 (accent gradient) */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="order-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl px-4 py-3 shadow-md max-w-[82%]">
                      Recent — Open-source dashboard + GPT-powered assistant.
                      <div className="text-xs text-white/80 mt-1">
                        Open source • GPT
                      </div>
                    </div>
                    <div className="order-1 flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-400 text-gray-900 shadow-sm">
                      {/* document icon */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2v6h6"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* bubble 3 */}
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500 text-white shadow-sm">
                      {/* briefcase icon */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <rect
                          x="3"
                          y="7"
                          width="18"
                          height="12"
                          rx="2"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 text-gray-800">
                      Interested in collaborating? I’m available for freelance &
                      product roles.
                      <div className="text-xs text-gray-400 mt-1">
                        Remote friendly
                      </div>
                    </div>
                  </div>
                </div>

                {/* small meta / chips row */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 2v6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="14"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Remote • India
                  </span>

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 12h18"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    React , Node , MongoDB, Python , AI/ML
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Scrollable Highlights (kept matching style) ---------- */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 -mt-6">
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap flex gap-6 py-6 scroll-smooth bg-gradient-to-br from-yellow-50 via-white to-purple-50 rounded-xl shadow-inner"
        >
          {posts.map((post, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="min-w-[260px] max-w-sm p-5 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-purple-200 flex-shrink-0"
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
      </div>

      {/* ---------- Admin Add Panel ---------- */}
      {user?.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 bg-white p-6 rounded-2xl shadow-md mt-8 space-y-4 max-w-md mx-auto border border-gray-200"
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

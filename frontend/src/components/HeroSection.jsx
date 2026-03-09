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

  // redesigned without image
  return (
    <section id="hero" className="mt-14 space-y-8 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_24px_60px_rgba(2,6,23,0.35)]">
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
            animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            aria-hidden
            className="absolute bottom-8 left-10 hidden lg:block opacity-60"
          >
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
              <g filter="url(#blur)">
                <path
                  d="M100 35c12 0 22 10 22 22s-10 22-22 22-22-10-22-22 10-22 22-22Z"
                  fill="url(#petal)"
                  opacity="0.9"
                />
                <path
                  d="M100 121c12 0 22 10 22 22s-10 22-22 22-22-10-22-22 10-22 22-22Z"
                  fill="url(#petal)"
                  opacity="0.7"
                />
                <path
                  d="M35 100c0-12 10-22 22-22s22 10 22 22-10 22-22 22-22-10-22-22Z"
                  fill="url(#petal)"
                  opacity="0.7"
                />
                <path
                  d="M121 100c0-12 10-22 22-22s22 10 22 22-10 22-22 22-22-10-22-22Z"
                  fill="url(#petal)"
                  opacity="0.6"
                />
                <circle cx="100" cy="100" r="18" fill="#0f172a" />
                <circle cx="100" cy="100" r="10" fill="#38bdf8" />
              </g>
              <defs>
                <linearGradient id="petal" x1="60" y1="40" x2="140" y2="160">
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
                <filter id="blur" x="-10" y="-10" width="220" height="220">
                  <feGaussianBlur stdDeviation="0.6" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 p-6 sm:p-8 lg:p-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wide">
                Product Engineer • AI/ML Builder
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                Ashish Kumar builds fast, reliable products that feel premium.
              </h1>

              <p className="text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed">
                <span className="block text-base sm:text-lg font-semibold text-white">
                  AI Automation & Full Stack Developer
                </span>
                <span className="mt-2 block">
                  I build AI chatbots, automation systems, and scalable web apps
                  that help startups save time and grow faster.
                </span>
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-slate-300">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  React • Node • MongoDB
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Python • AI/ML • APIs
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Remote • India
                </span>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {[
                {
                  label: "Recent Focus",
                  title: "Admin dashboard + GPT assistant + hire workflow",
                  body: "Built end-to-end UX with secure auth, analytics, and email automation.",
                },
                {
                  label: "Open to",
                  title: "Freelance, product roles, and collaborations",
                  body: "I love shipping fast, clean builds with strong UX.",
                },
                {
                  label: "Value",
                  title: "Clean UI, clear logic, measurable impact",
                  body: "Pragmatic engineering with a design-first approach.",
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.label}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="group rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-md hover:border-white/30 hover:shadow-[0_12px_32px_rgba(56,189,248,0.18)] transition"
                >
                  <div className="text-xs uppercase tracking-widest text-white/70">
                    {card.label}
                  </div>
                  <div className="mt-2 text-base sm:text-lg font-semibold text-white">
                    {card.title}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {card.body}
                  </p>
                  {idx === 2 && (
                    <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-70" />
                  )}
                </motion.div>
              ))}
            </motion.div>
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
              <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 truncate">
                {post.title}
              </h3>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xs sm:text-sm break-all"
              >
                {post.link}
              </a>
              {user?.role === "admin" && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(i);
                  }}
                  className="mt-3 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

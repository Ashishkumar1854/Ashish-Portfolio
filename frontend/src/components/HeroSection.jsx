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
    <section id="hero" className="mt-14 space-y-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_24px_60px_rgba(2,6,23,0.35)]">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 p-8 sm:p-10 lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                Product Engineer • AI/ML Builder
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Ashish Kumar builds fast, reliable products that feel premium.
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
                I design and ship full-stack web apps, dashboards, and AI-driven
                features that are clean, scalable, and user-focused.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-white/20 hover:bg-slate-100 transition"
                >
                  View Projects
                </a>
                <a
                  href="/hire"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  Hire Me
                </a>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
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
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-md">
                <div className="text-xs uppercase tracking-widest text-white/70">
                  Recent Focus
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Admin dashboard + GPT assistant + hire workflow
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Built end-to-end UX with secure auth, analytics, and email
                  automation.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-md">
                <div className="text-xs uppercase tracking-widest text-white/70">
                  Open to
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Freelance, product roles, and collaborations
                </div>
                <p className="mt-2 text-sm text-white/70">
                  I love shipping fast, clean builds with strong UX.
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-white/10 p-5">
                <div className="text-xs uppercase tracking-widest text-white/80">
                  Value
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Clean UI, clear logic, measurable impact
                </div>
                <p className="mt-2 text-sm text-white/75">
                  Pragmatic engineering with a design-first approach.
                </p>
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

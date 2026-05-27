import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", link: "" });
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/api/home/recentPost");
        setPosts(res.data.data?.content || []);
      } catch (err) {
        console.error("Fetch Recent Posts Error:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleAdd = async () => {
    if (!newPost.title || !newPost.link) {
      toast.warn("⚠️ Title and Link required");
      return;
    }
    try {
      const updated = [...posts, newPost];
      await API.post("/api/home", { section: "recentPost", content: updated });
      setPosts(updated);
      setNewPost({ title: "", link: "" });
      toast.success("✅ Post added successfully");
    } catch (err) {
      console.error("Add Post Error:", err);
      toast.error("❌ Failed to add post");
    }
  };

  const handleDelete = async (index) => {
    try {
      const updated = posts.filter((_, i) => i !== index);
      await API.post("/api/home", { section: "recentPost", content: updated });
      setPosts(updated);
      toast.info("🗑️ Post deleted");
    } catch (err) {
      console.error("Delete Post Error:", err);
      toast.error("❌ Failed to delete post");
    }
  };

  return (
    <>
      <section id="hero" className="bg-surface-deep pt-32 pb-section-gap-lg px-margin-mobile md:px-gutter max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {}
          <div className="w-full lg:w-3/5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block border border-border-subtle bg-surface-elevated rounded-full px-4 py-1.5 label-caps text-text-dim"
            >
              Product Engineer • AI/ML Builder
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-geist text-headline-lg-mobile md:text-headline-xl text-on-surface"
            >
              Ashish Kumar builds fast, reliable products that feel premium.
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body-lg text-on-surface-variant font-medium"
            >
              AI Automation & Full Stack Developer
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-body-md text-text-dim max-w-lg"
            >
              I build AI chatbots, automation systems, and scalable web apps that help startups save time and grow faster.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {["React • Node • MongoDB", "Python • AI/ML • APIs", "Remote • India"].map((chip, idx) => (
                <span key={idx} className="border border-border-subtle label-caps text-text-dim px-3 py-1.5 rounded-full">
                  {chip}
                </span>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Link to="/projects" className="btn-primary rounded">View Projects</Link>
              <Link to="/hire" className="btn-ghost rounded">Hire Me</Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="label-caps text-primary hover:underline ml-2">Download Resume</a>
            </motion.div>
          </div>

          {}
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            {[
              {
                label: "RECENT FOCUS",
                title: "Admin dashboard + GPT assistant + hire workflow",
                body: "Built end-to-end UX with secure auth, analytics, and email automation.",
              },
              {
                label: "OPEN TO",
                title: "Freelance, product roles, and collaborations",
                body: "I love shipping fast, clean builds with strong UX.",
              },
              {
                label: "VALUE",
                title: "Clean UI, clear logic, measurable impact",
                body: "Pragmatic engineering with a design-first approach.",
                isValue: true
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                className="glass-card p-6 rounded-xl hover:shadow-[0_20px_40px_rgba(45,91,255,0.1)] transition-all"
              >
                <div className="label-caps text-text-dim">{card.label}</div>
                <div className="text-headline-md text-on-surface mt-2">{card.title}</div>
                <p className="text-body-md text-text-dim mt-2">{card.body}</p>
                {card.isValue && (
                  <div className="mt-4 h-[2px] w-12 bg-primary rounded" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <div className="bg-surface-elevated border-y border-border-subtle py-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-wrap justify-center sm:justify-between items-center gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle">
          {[
            { num: "15+", text: "Projects Built" },
            { num: "3+", text: "Years Experience" },
            { num: "10+", text: "Clients Helped" },
            { num: "●", text: "Available for Work" },
          ].map((stat, idx) => (
            <div key={idx} className="flex gap-2 items-center px-4 pt-4 sm:pt-0 w-full sm:w-auto justify-center">
              <span className="text-primary font-geist text-xl font-bold">{stat.num}</span>
              <span className="label-caps text-text-dim">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>

      {}
      {posts.length > 0 && (
        <div className="bg-surface-deep py-12">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-6">
            <h3 className="label-caps text-primary">Live Updates</h3>
          </div>
          <div
            ref={scrollRef}
            className="overflow-x-auto whitespace-nowrap flex gap-6 px-4 sm:px-6 pb-6 scroll-smooth scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {posts.map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="min-w-[300px] max-w-sm p-5 rounded-xl glass-card flex-shrink-0 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-headline-md text-on-surface mb-2 truncate" title={post.title}>
                    {post.title}
                  </h3>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm break-all"
                  >
                    {post.link}
                  </a>
                </div>
                {user?.role === "admin" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(i);
                    }}
                    className="mt-4 label-caps text-error border border-error/50 px-3 py-1.5 rounded hover:bg-error/10 w-max"
                  >
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {}
      {user?.role === "admin" && (
        <div className="bg-surface-deep pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-xl space-y-4 max-w-md mx-auto"
          >
            <h3 className="label-caps text-on-surface">➕ Add New Recent Post</h3>
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full bg-surface-deep border border-border-subtle rounded px-3 py-2 text-on-surface focus:border-primary outline-none"
            />
            <input
              type="url"
              placeholder="Post Link"
              value={newPost.link}
              onChange={(e) => setNewPost({ ...newPost, link: e.target.value })}
              className="w-full bg-surface-deep border border-border-subtle rounded px-3 py-2 text-on-surface focus:border-primary outline-none"
            />
            <button
              onClick={handleAdd}
              className="w-full btn-primary rounded mt-2"
            >
              Add Post
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default HeroSection;

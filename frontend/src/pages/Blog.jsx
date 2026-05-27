import React, { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import BlogHero from "../components/BlogHero";
import BlogManager from "./Admin/BlogManager";
import { AuthContext } from "../context/AuthContext";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/api/blogs?page=${page}&limit=7&search=${search}`
      );
      setBlogs(res.data.blogs || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <div className="bg-surface-deep min-h-screen text-on-surface">
      <BlogHero onSearch={setSearch} />

      {user?.role === "admin" && (
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-gutter mb-12">
          <div className="glass-card p-6 rounded-xl">
             <BlogManager fetchBlogs={fetchBlogs} />
          </div>
        </div>
      )}

      <main className="max-w-[1280px] mx-auto px-margin-mobile md:px-gutter pb-section-gap-lg">
        {loading ? (
          <p className="text-center label-caps text-text-dim py-20">Loading insights...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center label-caps text-text-dim py-20">No articles found.</p>
        ) : (
          <>
            {}
            {featuredBlog && page === 1 && (
              <section className="mb-section-gap-md">
                <BlogCard blog={featuredBlog} featured={true} />
              </section>
            )}

            {}
            <div className="grid grid-cols-12 gap-6">
              
              {}
              {gridBlogs.map((blog) => (
                <div key={blog._id} className="col-span-12 md:col-span-6 lg:col-span-4 flex">
                  <BlogCard blog={blog} />
                </div>
              ))}

              {}
              <article className="glass-card col-span-12 lg:col-span-8 p-card-padding bg-gradient-to-br from-surface-elevated to-surface-deep flex flex-col md:flex-row items-center justify-between rounded-xl">
                <div className="mb-stack-md md:mb-0 max-w-md">
                  <h3 className="font-headline-lg text-headline-md mb-2">Weekly Briefing</h3>
                  <p className="font-body-md text-text-dim">Get a summary of technical deep-dives and product engineering strategies delivered to your inbox every Sunday.</p>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                  <input 
                    className="bg-surface-deep border border-border-subtle px-6 py-3 font-label-caps focus:border-primary focus:ring-0 w-full sm:w-64 outline-none transition-all text-on-surface rounded" 
                    placeholder="engineer@domain.com" 
                    type="email"
                  />
                  <button className="bg-primary text-on-primary font-label-caps px-8 py-3 font-bold hover:brightness-110 active:scale-95 transition-all rounded">JOIN</button>
                </div>
              </article>

              {}
              <article className="glass-card col-span-12 lg:col-span-4 p-card-padding flex flex-col justify-center border-l-4 border-l-primary rounded-xl">
                <span className="font-label-caps text-label-caps text-primary mb-4">QUICK FILTER</span>
                <div className="flex flex-wrap gap-2">
                  {['DOCKER', 'TYPESCRIPT', 'KUBERNETES', 'PYTHON', 'AWS', 'REACT'].map((tech) => (
                    <button key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 font-label-caps text-[11px] hover:border-primary hover:text-primary transition-all rounded">
                      {tech}
                    </button>
                  ))}
                </div>
              </article>

            </div>

            {}
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
          </>
        )}
      </main>
    </div>
  );
};

export default Blog;

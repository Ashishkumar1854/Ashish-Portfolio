import { Link, useNavigate } from "react-router-dom";
import React from "react";

const BlogCard = ({ blog, featured = false }) => {
  const navigate = useNavigate();

  const rawText = blog.content ? blog.content.replace(/<[^>]+>/g, '') : '';
  const excerpt = rawText.length > 150 ? rawText.substring(0, 150) + "..." : rawText;

  const dateStr = blog.createdAt 
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
    : "MAR 24, 2024";

  if (featured) {
    return (
      <div 
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="glass-card overflow-hidden group cursor-pointer flex flex-col lg:flex-row h-auto lg:h-[480px] w-full"
      >
        <div className="lg:w-7/12 relative overflow-hidden bg-surface-elevated">
          {blog.image && (
            <img 
              alt={blog.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              src={blog.image} 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="lg:w-5/12 p-card-padding flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-stack-md">
            <span className="bg-primary/10 text-primary px-3 py-1 font-label-caps text-[10px] border border-primary/20">FEATURED</span>
            <span className="font-label-caps text-label-caps text-text-dim">{dateStr}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg mb-stack-md group-hover:text-primary transition-colors">{blog.title}</h2>
          <p className="font-body-md text-body-md text-text-dim mb-stack-md">{excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-stack-md">
            {blog.tags?.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="font-label-caps text-[11px] text-on-surface-variant border border-border-subtle px-2 py-1 uppercase">{tag}</span>
            ))}
          </div>
          <div className="flex items-center text-primary font-label-caps text-label-caps group-hover:translate-x-2 transition-transform">
            READ CASE STUDY <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article 
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="glass-card p-stack-md flex flex-col cursor-pointer w-full group"
    >
      <div className="h-48 overflow-hidden mb-stack-md border border-white/5 bg-surface-elevated">
        {blog.image && (
          <img 
            alt={blog.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            src={blog.image} 
          />
        )}
      </div>
      <div className="flex items-center justify-between mb-stack-sm">
        <span className="font-label-caps text-[10px] text-secondary border border-secondary/20 px-2 py-0.5 uppercase">
          {blog.category || "ENGINEERING"}
        </span>
        <span className="font-label-caps text-[10px] text-text-dim">{dateStr}</span>
      </div>
      <h3 className="font-headline-md text-headline-md mb-stack-sm group-hover:text-primary transition-colors">{blog.title}</h3>
      <p className="font-body-md text-body-md text-text-dim mb-auto line-clamp-2">{excerpt}</p>
      
      <div className="pt-stack-md mt-stack-md border-t border-border-subtle flex justify-between items-center">
        <span className="font-label-caps text-label-caps text-text-dim italic">5 min read</span>
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>bookmark</span>
      </div>
    </article>
  );
};

export default BlogCard;

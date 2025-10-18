// //✅ src/components/BlogCard.jsx

import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // ✅ Create short HTML preview (keep bold, italic, bullets etc.)
  const truncatedContent =
    blog.content.length > 250
      ? blog.content.substring(0, 250) + "..."
      : blog.content;

  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300 border border-gray-100">
      {/* ✅ Background image if available */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* ✅ Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>

      {/* ✅ Card content on top of overlay */}
      <div className="relative p-6 h-64 flex flex-col justify-end text-white">
        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>

        {/* ✅ Render short blog content with formatting */}
        <div
          className="text-sm opacity-90 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />

        <div className="flex justify-between items-center text-xs mt-3 opacity-90">
          <span>
            By <span className="font-semibold">{blog.author}</span>
          </span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <Link
          to={`/blog/${blog._id}`}
          className="mt-3 inline-block text-blue-300 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

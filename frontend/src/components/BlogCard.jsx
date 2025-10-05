//✅ src/components/BlogCard.jsx

import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const truncated =
    blog.content.length > 180
      ? blog.content.substring(0, 180) + "..."
      : blog.content;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300">
      <div className="mb-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 text-sm">{truncated}</p>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>
          By <span className="font-medium">{blog.author}</span>
        </span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <Link
        to={`/blog/${blog._id}`}
        className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;

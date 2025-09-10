// ✅ src/pages/SingleBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Temporary states for like/comment/share
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/blogs/${slug}`)
      .then((res) => {
        setBlog(res.data);
        setLikes(res.data.likes?.length || 0);
        setComments(res.data.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!blog) return <p className="text-center">Blog not found</p>;

  // Handle like toggle (UI only, connect backend later)
  const handleLike = () => {
    setLikes((prev) => (prev > likes ? prev - 1 : prev + 1));
  };

  // Handle comment add (UI only, connect backend later)
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
      user: "You",
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">By {blog.author?.name || "Admin"}</p>

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="rounded-lg mb-6 w-full"
        />
      )}

      <p className="text-lg leading-relaxed mb-8">{blog.content}</p>

      {/* ✅ Actions */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={handleLike}
          className="text-blue-600 font-semibold hover:underline"
        >
          👍 Like ({likes})
        </button>
        <button className="text-green-600 font-semibold hover:underline">
          🔗 Share
        </button>
      </div>

      {/* ✅ Comments */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Comments</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 rounded-md"
          >
            Post
          </button>
        </div>
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
              <p className="font-semibold">{c.user}</p>
              <p className="text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;

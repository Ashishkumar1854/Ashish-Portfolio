
























import React, { useEffect, useState } from "react";
import { Trash2, Star } from "lucide-react";
import API from "../../utils/api"; // ✅ centralized API

const FeedbackViewer = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get("/api/feedback");
      console.log("⬅️ Fetched feedbacks:", res.data); // debug log
      setFeedbacks(res.data);
    } catch (err) {
      console.error("❌ Error fetching feedback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    console.log("🧾 Deleting feedback id:", id); // check ID
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;
    try {
      const res = await API.delete(`/api/feedback/${id}`);
      console.log("✅ Delete Response:", res.data); // backend response
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (err) {
      console.error(
        "❌ Delete failed:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const filteredFeedbacks =
    filter === "All"
      ? feedbacks
      : feedbacks.filter((fb) => fb.category === filter);

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (sort === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "Highest Rating") return b.rating - a.rating;
    if (sort === "Lowest Rating") return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">📊 User Feedback Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Analyze, sort, and manage user feedback to improve your services.
      </p>

      {}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg shadow-sm"
        >
          <option>All</option>
          <option>Website</option>
          <option>Service</option>
          <option>Product</option>
          <option>Other</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg shadow-sm"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest Rating</option>
          <option>Lowest Rating</option>
        </select>
      </div>

      {}
      <div className="overflow-x-auto bg-white shadow rounded-xl border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Loading feedback...
                </td>
              </tr>
            ) : sortedFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No feedback available.
                </td>
              </tr>
            ) : (
              sortedFeedbacks.map((fb, idx) => (
                <tr
                  key={fb._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b hover:bg-gray-100`}
                >
                  <td className="p-3 font-medium text-gray-800">
                    {fb.isAnonymous ? "Anonymous" : fb.name}
                  </td>
                  <td className="p-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < fb.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </td>
                  <td className="p-3">{fb.category}</td>
                  <td className="p-3 text-gray-700">{fb.message}</td>
                  <td className="p-3 text-gray-500">
                    {new Date(fb.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteFeedback(fb._id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackViewer;

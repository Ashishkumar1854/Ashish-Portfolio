// src/pages/Feedback.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import { useAuth } from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const Feedback = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/feedback`, {
        params: { page: pageNum, limit: 10 },
      });

      if (pageNum === 1) {
        setFeedbacks(res.data.feedbacks || []);
      } else {
        setFeedbacks((prev) => [...prev, ...(res.data.feedbacks || [])]);
      }
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error("❌ Fetch feedback failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(page);
  }, [page]);

  // Infinite scroll observer
  const observer = useRef();
  const lastFeedbackRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14 px-6 text-center shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          We Value Your Feedback 💬
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Your thoughts and suggestions help us improve continuously. Share your
          experience, rate our services, and help us build something better for
          you!
        </p>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">
            Share Your Feedback
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Fill out the quick form below and let us know your thoughts.
          </p>
          <FeedbackForm
            onSuccess={(newFeedback) =>
              setFeedbacks([newFeedback, ...feedbacks])
            }
          />
        </div>

        {/* Feedback Wall */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            What Others Are Saying 👇
          </h2>

          <div className="bg-white rounded-xl shadow-md p-4">
            <FeedbackList
              feedbacks={feedbacks}
              user={user}
              onDelete={(id) =>
                setFeedbacks(feedbacks.filter((fb) => fb._id !== id))
              }
              lastFeedbackRef={lastFeedbackRef}
            />

            {loading && <p className="text-center py-3">Loading more...</p>}
            {!hasMore && (
              <p className="text-center text-gray-500 py-3">
                🎉 You’ve reached the end of the feedback wall!
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;

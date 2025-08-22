import React, { useState } from "react";

const FeedbackViewer = () => {
  // 🧪 Dummy feedback entries (replace with DB call later)
  const [feedbackList] = useState([
    {
      name: "Rahul Kumar",
      email: "rahul@example.com",
      message: "Great work on the portfolio site!",
    },
    {
      name: "Anjali Sharma",
      email: "anjali@example.com",
      message: "Loved your AI projects and blog design.",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📩 User Feedback</h2>

      <div className="space-y-4">
        {feedbackList.map((feedback, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-md shadow-md border border-gray-200"
          >
            <p className="text-gray-800 font-semibold">
              👤 {feedback.name} ({feedback.email})
            </p>
            <p className="mt-2 text-gray-700">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackViewer;

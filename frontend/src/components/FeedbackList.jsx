// src/components/FeedbackList.jsx
import React from "react";
import FeedbackCard from "./FeedbackCard";

const FeedbackList = ({ feedbacks, user, onDelete }) => {
  return (
    <div className="space-y-4">
      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-center">No feedback yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <FeedbackCard
            key={fb._id}
            feedback={fb}
            user={user}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default FeedbackList;

import React from "react";
import { format } from "date-fns";

const TimelineCard = ({ title, description, timestamp, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[70%] p-3 rounded-xl shadow-sm text-sm ${
          isUser ? "bg-yellow-100 text-right" : "bg-blue-100 text-left"
        }`}
      >
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <p className="text-gray-600 mt-1">{description}</p>
        {timestamp && (
          <span className="block mt-1 text-gray-400 text-xs">
            {format(new Date(timestamp), "PPpp")}
          </span>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;

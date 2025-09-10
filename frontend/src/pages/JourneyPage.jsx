import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useAuth } from "../context/AuthContext";
import JourneyManager from "./Admin/JourneyManager";

const JourneyPage = () => {
  const [journeyTimeline, setJourneyTimeline] = useState([]);
  const { user } = useAuth();
  const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

  // 🔁 Fetch journey entries from backend
  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/journey`);
        setJourneyTimeline(res.data);
      } catch (err) {
        console.error("Failed to load journey data 🚫", err);
      }
    };
    fetchJourney();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        🚀 My Journey
      </h2>

      <VerticalTimeline>
        {journeyTimeline.map((item) => (
          <VerticalTimelineElement
            key={item._id}
            date={item.year}
            iconStyle={{ background: "#facc15", color: "#000" }}
            contentStyle={{ background: "#fff8dc", color: "#333" }}
            contentArrowStyle={{ borderRight: "7px solid #facc15" }}
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2">{item.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* Admin Section */}
      {user?.role === "admin" && (
        <div className="mt-10">
          <JourneyManager />
        </div>
      )}
    </div>
  );
};

export default JourneyPage;

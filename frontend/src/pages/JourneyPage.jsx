







import React, { useEffect, useState } from "react";
import API from "../utils/api"; // ✅ centralized API
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

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await API.get("/api/journey");
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

      {}
      {user?.role === "admin" && (
        <div className="mt-10">
          <JourneyManager />
        </div>
      )}
    </div>
  );
};

export default JourneyPage;

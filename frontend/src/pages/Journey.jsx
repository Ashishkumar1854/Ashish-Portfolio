// src/pages/JourneyPage.jsx

import React /*, { useEffect, useState }*/ from "react";
// import axios from "axios";

// Timeline component import
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Import default styles

// 🎯 Component Start
const JourneyPage = () => {
  // Commented for now - dynamic fetching
  /*
  const [journeyTimeline, setJourneyTimeline] = useState([]);

  // 🔁 Fetch journey data from backend (MongoDB)
  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/journey"); // ✅ Change port if needed
        setJourneyTimeline(res.data);
      } catch (err) {
        console.error("Failed to load journey data 🚫", err);
      }
    };

    fetchJourney();
  }, []);
  */

  // 🧪 Dummy data (used only for frontend design layout)
  const journeyTimeline = [
    {
      year: "2022",
      title: "Started B.Tech in CSE",
      description: "Began core programming & development journey.",
    },
    {
      year: "2023",
      title: "First Internship - Python",
      description: "Worked on APIs and mini-projects as a Python Intern.",
    },
    {
      year: "2024",
      title: "Major Project - Voting System",
      description:
        "Built a secure voting app with Face Recognition using React + Python + MongoDB.",
    },
    {
      year: "2025",
      title: "Started Freelancing",
      description:
        "Started providing freelance services in full-stack and AI/ML domains.",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        🚀 My Journey
      </h2>

      {/* 📅 Timeline View */}
      <VerticalTimeline>
        {journeyTimeline.map((item, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={item.year}
            iconStyle={{ background: "#facc15", color: "#000" }} // Yellow background
            contentStyle={{ background: "#fff8dc", color: "#333" }}
            contentArrowStyle={{ borderRight: "7px solid #facc15" }}
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2">{item.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default JourneyPage;

// src/pages/Admin/AdminDashboard.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProjectManager from "./ProjectManager";
import InternshipManager from "./InternshipManager";
import BlogManager from "./BlogManager";
import JourneyManager from "./JourneyManager";
import AssistantManager from "./AssistantManager";
import FeedbackViewer from "./FeedbackViewer";

// Chart library
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🧪 Dummy chart data
const chartData = [
  { name: "Projects", value: 12 },
  { name: "Internships", value: 5 },
  { name: "Blogs", value: 8 },
  { name: "Journey", value: 4 },
  { name: "Feedback", value: 6 },
];

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        ⚙️ Admin Dashboard
      </h2>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
          <p className="text-2xl font-bold">12</p>
          <p className="text-gray-700">Projects</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center shadow">
          <p className="text-2xl font-bold">5</p>
          <p className="text-gray-700">Internships</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
          <p className="text-2xl font-bold">8</p>
          <p className="text-gray-700">Blogs</p>
        </div>
      </div>

      {/* 📊 Recharts Visualization */}
      <div className="bg-white p-4 rounded-lg shadow mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          📈 Overview Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔗 Admin Section Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <Link to="projects" className="admin-link-card">
          📊 Projects
        </Link>
        <Link to="internships" className="admin-link-card">
          💼 Internships
        </Link>
        <Link to="blogs" className="admin-link-card">
          ✍️ Blogs
        </Link>
        <Link to="journey" className="admin-link-card">
          📅 Journey
        </Link>
        <Link to="assistant" className="admin-link-card">
          🤖 Assistant
        </Link>
        <Link to="feedback" className="admin-link-card">
          📩 Feedback
        </Link>
      </div>

      {/* 🔄 Nested Admin Routes */}
      <Routes>
        <Route path="projects" element={<ProjectManager />} />
        <Route path="internships" element={<InternshipManager />} />
        <Route path="blogs" element={<BlogManager />} />
        <Route path="journey" element={<JourneyManager />} />
        <Route path="assistant" element={<AssistantManager />} />
        <Route path="feedback" element={<FeedbackViewer />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;

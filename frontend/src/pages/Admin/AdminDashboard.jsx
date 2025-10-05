// // src/pages/Admin/AdminDashboard.jsx
// import React from "react";
// import { Link, Routes, Route } from "react-router-dom";
// import ProjectManager from "./ProjectManager";
// import FresherOpportunityManager from "./FresherOpportunityManager";
// import BlogManager from "./BlogManager";
// import JourneyManager from "./JourneyManager";
// import AssistantManager from "./AssistantManager";
// import FeedbackViewer from "./FeedbackViewer";

// // Chart library
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // 🧪 Dummy chart data
// const chartData = [
//   { name: "Projects", value: 12 },
//   { name: "Fresher Opportunities", value: 5 },
//   { name: "Blogs", value: 8 },
//   { name: "Journey", value: 4 },
//   { name: "Feedback", value: 6 },
// ];

// const AdminDashboard = () => {
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         ⚙️ Admin Dashboard
//       </h2>

//       {/* ✅ Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//         <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
//           <p className="text-2xl font-bold">12</p>
//           <p className="text-gray-700">Projects</p>
//         </div>
//         <div className="bg-green-100 p-4 rounded-lg text-center shadow">
//           <p className="text-2xl font-bold">5</p>
//           <p className="text-gray-700">Fresher Opportunities</p>
//         </div>
//         <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
//           <p className="text-2xl font-bold">8</p>
//           <p className="text-gray-700">Blogs</p>
//         </div>
//       </div>

//       {/* 📊 Recharts Visualization */}
//       <div className="bg-white p-4 rounded-lg shadow mb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">
//           📈 Overview Chart
//         </h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#facc15" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 🔗 Admin Section Links */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//         <Link to="projects" className="admin-link-card">
//           📊 Projects
//         </Link>
//         <Link to="fresher-opportunities" className="admin-link-card">
//           💼 Fresher Opportunities
//         </Link>

//         <Link to="blogs" className="admin-link-card">
//           ✍️ Blogs
//         </Link>
//         <Link to="journey" className="admin-link-card">
//           📅 Journey
//         </Link>
//         <Link to="assistant" className="admin-link-card">
//           🤖 Assistant
//         </Link>
//         <Link to="feedback" className="admin-link-card">
//           📩 Feedback
//         </Link>
//       </div>

//       {/* 🔄 Nested Admin Routes */}
//       <Routes>
//         <Route path="projects" element={<ProjectManager />} />
//         <Route
//           path="fresher-opportunities"
//           element={<FresherOpportunityManager />}
//         />
//         <Route path="blogs" element={<BlogManager />} />
//         <Route path="journey" element={<JourneyManager />} />
//         <Route path="assistant" element={<AssistantManager />} />
//         <Route path="feedback" element={<FeedbackViewer />} />
//       </Routes>
//     </div>
//   );
// };

// export default AdminDashboard;

///06/0oeow

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2"; // ✅ Correct import
// import "chart.js/auto";

// const AdminDashboard = () => {
//   const [metrics, setMetrics] = useState({});
//   const [recentUsers, setRecentUsers] = useState([]);
//   const [recentBlogs, setRecentBlogs] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const { data } = await axios.get("/api/admin/dashboard");
//         setMetrics(data.metrics || {});
//         setRecentUsers(data.recentUsers || []);
//         setRecentBlogs(data.recentBlogs || []);
//       } catch (error) {
//         console.error("Failed to fetch dashboard data", error);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   const chartData = {
//     labels: ["Users", "Admins", "Blogs", "Projects", "Feedback"],
//     datasets: [
//       {
//         label: "Site Metrics",
//         data: [
//           metrics.totalUsers || 0,
//           metrics.totalAdmins || 0,
//           metrics.totalBlogs || 0,
//           metrics.totalProjects || 0,
//           metrics.totalFeedback || 0,
//         ],
//         backgroundColor: [
//           "#4f46e5", // Indigo
//           "#10b981", // Emerald
//           "#f59e0b", // Amber
//           "#ef4444", // Red
//           "#3b82f6", // Blue
//         ],
//         borderRadius: 6,
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         🧭 Admin Dashboard
//       </h1>

//       {/* 🔹 Metric Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//         {[
//           { label: "Users", value: metrics.totalUsers },
//           { label: "Admins", value: metrics.totalAdmins },
//           { label: "Blogs", value: metrics.totalBlogs },
//           { label: "Projects", value: metrics.totalProjects },
//           { label: "Feedback", value: metrics.totalFeedback },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="bg-white shadow-md rounded-xl p-4 text-center border border-gray-100"
//           >
//             <p className="text-gray-500">{item.label}</p>
//             <p className="text-2xl font-bold text-gray-800">
//               {item.value ?? 0}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* 🔹 Chart Section */}
//       <div className="bg-white shadow-md rounded-xl p-6 mb-8">
//         <h2 className="font-semibold text-lg mb-3 text-gray-700">
//           📊 Site Metrics Overview
//         </h2>
//         <Bar data={chartData} />
//       </div>

//       {/* 🔹 Recent Users */}
//       <div className="bg-white shadow-md rounded-xl p-6 mb-8">
//         <h2 className="font-semibold text-lg mb-3 text-gray-700">
//           👥 Recent Users
//         </h2>
//         {recentUsers.length > 0 ? (
//           <ul>
//             {recentUsers.map((user) => (
//               <li
//                 key={user._id}
//                 className="flex justify-between py-2 border-b last:border-none text-gray-600"
//               >
//                 <span>{user.name}</span>
//                 <span className="text-sm text-gray-400">{user.email}</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400 text-sm">No recent users found.</p>
//         )}
//       </div>

//       {/* 🔹 Recent Blogs */}
//       <div className="bg-white shadow-md rounded-xl p-6">
//         <h2 className="font-semibold text-lg mb-3 text-gray-700">
//           📝 Recent Blogs
//         </h2>
//         {recentBlogs.length > 0 ? (
//           <ul>
//             {recentBlogs.map((blog) => (
//               <li
//                 key={blog._id}
//                 className="flex justify-between py-2 border-b last:border-none text-gray-600"
//               >
//                 <span>{blog.title}</span>
//                 <span className="text-sm text-gray-400">
//                   {new Date(blog.createdAt).toLocaleDateString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400 text-sm">No recent blogs found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import HireAdmin from "../HireAdmin"; // Existing pending hire logic
import { Bar } from "react-chartjs-2"; // Metrics Chart
import "chart.js/auto";

const API_BASE = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  // 🧾 Metrics state
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalBlogs: 0,
    totalProjects: 0,
    totalFeedback: 0,
    totalHires: 0,
    confirmedHires: 0,
    pendingHires: 0,
  });

  // 📄 Recent data state
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentHires, setRecentHires] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 📊 Dashboard metrics & recent items
        const res = await axios.get(`${API_BASE}/api/admin/dashboard`);
        const data = res.data;

        setMetrics((prev) => ({
          ...prev,
          totalUsers: data.metrics.totalUsers || 0,
          totalAdmins: data.metrics.totalAdmins || 0,
          totalBlogs: data.metrics.totalBlogs || 0,
          totalProjects: data.metrics.totalProjects || 0,
          totalFeedback: data.metrics.totalFeedback || 0,
          totalHires: data.metrics.totalHires || 0,
          confirmedHires: data.metrics.confirmedHires || 0,
          pendingHires: data.metrics.pendingHires || 0,
        }));

        setRecentUsers(data.recentUsers || []);
        setRecentBlogs(data.recentBlogs || []);
        setRecentHires(data.recentHires || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboard();
  }, []);

  const chartData = {
    labels: ["Total Hires", "Confirmed", "Pending"],
    datasets: [
      {
        label: "Hire Overview",
        data: [
          metrics.totalHires,
          metrics.confirmedHires,
          metrics.pendingHires,
        ],
        backgroundColor: ["#4f46e5", "#10b981", "#f59e0b"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold mb-6">🧠 Admin Dashboard</h1>

      {/* 🔹 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Users", value: metrics.totalUsers, color: "bg-indigo-100" },
          {
            label: "Admins",
            value: metrics.totalAdmins,
            color: "bg-green-100",
          },
          { label: "Blogs", value: metrics.totalBlogs, color: "bg-yellow-100" },
          {
            label: "Projects",
            value: metrics.totalProjects,
            color: "bg-red-100",
          },
          {
            label: "Feedback",
            value: metrics.totalFeedback,
            color: "bg-blue-100",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`${item.color} p-4 rounded-xl shadow text-center`}
          >
            <p className="text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Hire Overview Chart */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">📈 Hire Overview</h2>
        <Bar data={chartData} />
      </div>

      {/* 🔹 Recent Hires */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">🧾 Recent Hires</h2>
        {recentHires.length === 0 ? (
          <p className="text-gray-400">No recent hires found.</p>
        ) : (
          <ul className="list-disc list-inside">
            {recentHires.map((hire, idx) => (
              <li key={idx}>
                {hire.name} — {hire.projectType} — {hire.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 Recent Users */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">👥 Recent Users</h2>
        {recentUsers.length === 0 ? (
          <p className="text-gray-400">No recent users found.</p>
        ) : (
          <ul>
            {recentUsers.map((user) => (
              <li
                key={user._id}
                className="flex justify-between py-2 border-b last:border-none text-gray-600"
              >
                <span>{user.name}</span>
                <span className="text-sm text-gray-400">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 Recent Blogs */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">📝 Recent Blogs</h2>
        {recentBlogs.length === 0 ? (
          <p className="text-gray-400">No recent blogs found.</p>
        ) : (
          <ul>
            {recentBlogs.map((blog) => (
              <li
                key={blog._id}
                className="flex justify-between py-2 border-b last:border-none text-gray-600"
              >
                <span>{blog.title}</span>
                <span className="text-sm text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 Pending Freelancer Hire Requests */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-inner mt-6">
        <h2 className="text-xl font-semibold mb-2">Pending Hire Requests</h2>
        <HireAdmin /> {/* ✅ Existing pending logic */}
      </div>
    </div>
  );
};

export default AdminDashboard;

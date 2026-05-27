import React, { useEffect, useState } from "react";
import API from "../../utils/api"; 
import HireAdmin from "../HireAdmin";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0, totalAdmins: 0, totalBlogs: 0, totalProjects: 0,
    totalFeedback: 0, totalHires: 0, confirmedHires: 0, pendingHires: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentHires, setRecentHires] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/api/admin/dashboard", {
        withCredentials: true,
      });
      const data = res.data;

      if (data && data.metrics) {
        setMetrics({
          ...metrics,
          ...data.metrics
        });
      }
      setRecentUsers(data.recentUsers || []);
      setRecentBlogs(data.recentBlogs || []);
      setRecentHires(data.recentHires || []);
    } catch (err) {
      console.error("❌ Dashboard fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { ticks: { color: "#a1a1aa" }, grid: { color: "#27272a" } },
      x: { ticks: { color: "#a1a1aa" }, grid: { color: "#27272a" } }
    },
    plugins: {
      legend: { labels: { color: "#e4e4e7" } }
    }
  };

  const handleVerifyHire = async (hireId) => {
    try {
      const res = await API.put(`/api/admin/hire/${hireId}/verify`, null, {
        withCredentials: true,
      });
      if (res.data.success) {
        alert("Hire verified successfully ✅");
        fetchDashboard();
      }
    } catch (err) {
      console.error("❌ Error verifying hire:", err);
      alert("Failed to verify hire ❌");
    }
  };

  return (
    <div className="bg-surface-deep min-h-screen text-on-surface pt-24 pb-12">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-gutter space-y-8">
        
        <div className="flex items-center gap-4 mb-8">
          <span className="material-symbols-outlined text-4xl text-primary">admin_panel_settings</span>
          <h1 className="text-headline-lg font-bold">Admin Dashboard</h1>
        </div>

        {}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Users", value: metrics.totalUsers, icon: "group" },
            { label: "Admins", value: metrics.totalAdmins, icon: "admin_panel_settings" },
            { label: "Blogs", value: metrics.totalBlogs, icon: "article" },
            { label: "Projects", value: metrics.totalProjects, icon: "code" },
            { label: "Feedback", value: metrics.totalFeedback, icon: "forum" },
          ].map((item) => (
            <div key={item.label} className="glass-card p-6 rounded-xl flex flex-col justify-center items-center">
              <span className="material-symbols-outlined text-text-dim mb-2">{item.icon}</span>
              <p className="text-3xl font-mono text-primary mb-1">{item.value}</p>
              <p className="label-caps text-text-dim">{item.label}</p>
            </div>
          ))}
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-headline-md mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              Hire Overview
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-headline-md mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              Recent Hires
            </h2>
            {recentHires.length === 0 ? (
              <p className="text-text-dim label-caps">No recent hires found.</p>
            ) : (
              <ul className="space-y-4">
                {recentHires.map((hire) => (
                  <li key={hire._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-surface-elevated border border-border-subtle rounded-lg hover:bg-white/5 transition-colors">
                    <div>
                      <span className="font-bold block mb-1">{hire.name}</span>
                      <span className="text-sm text-text-dim block mb-2 sm:mb-0">{hire.projectType}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`label-caps px-2 py-1 rounded border ${hire.status === "pending" ? "text-tertiary border-tertiary" : "text-primary border-primary"}`}>
                        {hire.status}
                      </span>
                      {hire.status === "pending" && (
                        <button onClick={() => handleVerifyHire(hire._id)} className="btn-primary px-3 py-1 text-xs rounded">
                          Verify
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-headline-md mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">group</span>
              Recent Users
            </h2>
            {recentUsers.length === 0 ? (
              <p className="text-text-dim label-caps">No recent users found.</p>
            ) : (
              <ul className="space-y-2">
                {recentUsers.map((user) => (
                  <li key={user._id} className="flex justify-between items-center py-3 border-b border-border-subtle last:border-none">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-text-dim">{user.email}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-headline-md mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">article</span>
              Recent Blogs
            </h2>
            {recentBlogs.length === 0 ? (
              <p className="text-text-dim label-caps">No recent blogs found.</p>
            ) : (
              <ul className="space-y-2">
                {recentBlogs.map((blog) => (
                  <li key={blog._id} className="flex justify-between items-center py-3 border-b border-border-subtle last:border-none">
                    <span className="font-medium">{blog.title}</span>
                    <span className="text-sm text-text-dim">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {}
        <div className="glass-card p-6 rounded-xl mt-6">
          <h2 className="text-headline-md mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">pending_actions</span>
            Pending Hire Requests
          </h2>
          <HireAdmin />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

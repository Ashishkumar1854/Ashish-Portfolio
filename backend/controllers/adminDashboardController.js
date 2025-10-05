// File: backend/controllers/adminDashboardController.js (new file)

// File: backend/controllers/adminDashboardController.js

const User = require("../models/User");
const Blog = require("../models/Blog");
const Project = require("../models/Project");
const Feedback = require("../models/Feedback");
const Hire = require("../models/Hire"); // ✅ Add Hire model

// Controller to get metrics + recent activity
const getDashboardData = async (req, res) => {
  try {
    // 📊 Metrics
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalBlogs = await Blog.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalFeedback = await Feedback.countDocuments();

    // 📝 Hire metrics
    const totalHires = await Hire.countDocuments();
    const confirmedHires = await Hire.countDocuments({ status: "confirmed" });
    const pendingHires = await Hire.countDocuments({ status: "pending" });

    // 🕒 Recent activity (last 5)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const recentFeedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const recentHires = await Hire.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      metrics: {
        totalUsers,
        totalAdmins,
        totalBlogs,
        totalProjects,
        totalFeedback,
        totalHires,
        confirmedHires,
        pendingHires,
      },
      recentUsers,
      recentBlogs,
      recentProjects,
      recentFeedback,
      recentHires,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardData };

// 📦 Core libraries
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔐 Auth-related components
import ResetPassword from "./auth/ResetPassword";

// 🌍 Global auth state provider
import { AuthProvider } from "./context/AuthContext";

// 🌐 Common layout component
import Navbar from "./components/Navbar";

// 🛡️ ProtectedRoute
import ProtectedRoute from "./protector/ProtectedRoute";

// 🗂️ Page Components
import Home from "./pages/Home";
import OtpEmailPage from "./pages/OtpEmailPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import About from "./pages/About";
import Projects from "./pages/Project";
import FresherOpportunities from "./pages/FresherOpportunities";
import Feedback from "./pages/Feedback";
import Journey from "./pages/Journey";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Assistant from "./pages/Assistant";
import HireForm from "./pages/HireForm";
import VerifySuccess from "./pages/VerifySuccess";
import Footer from "./components/Footer";

// 🧾 Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard"; // Charts + metrics
import HireAdmin from "./pages/HireAdmin"; // Pending hire requests
import BlogManager from "./pages/Admin/BlogManager"; // Blog CRUD

// ✅ Axios default config
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="p-4">
          <Routes>
            {/* 🌍 Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/fresher-opportunities"
              element={<FresherOpportunities />}
            />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/hire" element={<HireForm />} />

            {/* 📝 Blog Detail Page */}
            <Route path="/blog/:id" element={<BlogDetail />} />

            {/* 🔐 Auth Routes */}
            <Route path="/otp-login" element={<OtpEmailPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/verify-success" element={<VerifySuccess />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* 🛡️ Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 📋 Hire Management (Pending + Confirm Hire Requests) */}
            <Route
              path="/admin/hire"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <HireAdmin />
                </ProtectedRoute>
              }
            />

            {/* 🧾 Blog Manager (Admin CMS) */}
            <Route
              path="/admin/blogs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <BlogManager />
                </ProtectedRoute>
              }
            />

            {/* 🔁 Backward Compatible Old Dashboard Route */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

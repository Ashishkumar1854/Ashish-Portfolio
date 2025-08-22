// 📦 Importing core libraries
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
import Internships from "./pages/Internship";
import Feedback from "./pages/Feedback";
import Journey from "./pages/Journey";
import Blog from "./pages/Blog";
import Assistant from "./pages/Assistant";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import VerifySuccess from "./pages/VerifySuccess";

// ✅ Set Axios config after imports
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="p-4">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/assistant" element={<Assistant />} />

            {/* Auth Routes */}
            <Route path="/otp-login" element={<OtpEmailPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/verify-success" element={<VerifySuccess />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* 🛡️ Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

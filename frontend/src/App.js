
















import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ResetPassword from "./auth/ResetPassword";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./protector/ProtectedRoute";

import Home from "./pages/Home";
import OtpEmailPage from "./pages/OtpEmailPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import About from "./pages/About";
import Projects from "./pages/Project";
import Journey from "./pages/Journey";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Assistant from "./pages/Assistant";
import HireForm from "./pages/HireForm";
import VerifySuccess from "./pages/VerifySuccess";
import Footer from "./components/Footer";
import Skills from "./pages/Skills";

import AdminDashboard from "./pages/Admin/AdminDashboard"; // Charts + metrics
import HireAdmin from "./pages/HireAdmin"; // Pending hire requests
import BlogManager from "./pages/Admin/BlogManager"; // Blog CRUD

axios.defaults.withCredentials = true;

const AppWrapper = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/assistant"; // only hide footer on Assistant page

  return (
    <>
      {}
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="p-4">
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/hire" element={<HireForm />} />

          {}
          <Route path="/blog/:id" element={<BlogDetail />} />

          {}
          <Route path="/otp-login" element={<OtpEmailPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/hire"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <HireAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BlogManager />
              </ProtectedRoute>
            }
          />

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

      {}
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper />
      </Router>
    </AuthProvider>
  );
}

export default App;

// ✅ src/protector/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-4">Loading...</p>;

  // 👤 Guest: Not logged in
  if (!user) return <Navigate to="/otp-login" replace />;

  // ✅ Allowed role
  if (allowedRoles.includes(user.role)) return children;

  // 🚫 Unauthorized
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

//04/09

// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Base URL (from env or local)
  const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

  // ✅ Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        withCredentials: true,
      });
      setUser(res.data || null);
    } catch (err) {
      console.error("❌ Fetch profile failed:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-fetch on mount
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⚡ Login
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, formData, {
        withCredentials: true,
      });
      if (res.data?.user) setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      throw err;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    }
  };

  // 🔄 Refresh user (e.g. after coins update or profile edit)
  const refreshUser = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, refreshUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);

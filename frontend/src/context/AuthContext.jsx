




//     // eslint-disable-next-line react-hooks/exhaustive-deps








import React, { createContext, useEffect, useState, useContext } from "react";
import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/auth/profile");
      setUser(res.data || null);
    } catch (err) {
      console.error(
        "❌ Fetch profile failed:",
        err.response?.data?.message || err.message
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (formData) => {
    try {
      const res = await API.post("/api/auth/login", formData);
      const nextUser = res.data?.user || res.data;
      const token = res.data?.token;
      if (token && typeof window !== "undefined") {
        window.localStorage.setItem("auth_token", token);
      }
      if (nextUser) setUser(nextUser);
      return res.data;
    } catch (err) {
      console.error(
        "❌ Login failed:",
        err.response?.data?.message || err.message
      );
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.post("/api/auth/logout");
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("auth_token");
      }
    } catch (err) {
      console.error(
        "❌ Logout failed:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

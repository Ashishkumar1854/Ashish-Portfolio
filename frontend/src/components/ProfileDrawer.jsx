// for mobile phone side bar profile arrange in better way and ye import h dise bar section me // Inside Sidebar.jsx (replace bottom Profile/Register section)

// frontend/src/components/ProfileDrawer.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, LogOut, Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Dark/Light theme toggle
import { useAuth } from "../context/AuthContext"; // ✅ Use same auth as ProfileMenu
import axios from "axios";

const ProfileDrawer = ({ show, onClose }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);

  // Fetch coins & streak same as ProfileMenu
  useEffect(() => {
    if (show && user?._id) {
      const fetchCoinsAndStreak = async () => {
        try {
          const res = await axios.get("http://localhost:5001/api/coins", {
            withCredentials: true,
          });
          setCoins(res.data.coins || 0);
          setStreak(res.data.dailyStreak || 0);
        } catch (err) {
          console.error("Failed to fetch coins/streak:", err);
          setCoins(0);
          setStreak(0);
        }
      };
      fetchCoinsAndStreak();
    }
  }, [show, user]);

  const handleLogout = async () => {
    await logout();
    onClose();
    window.location.href = "/";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-up Drawer */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-t-2xl p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {user?.name || "User Profile"}
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* User Stats */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🔥 Streak: {streak} days
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💰 Coins: {coins}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {/* Settings */}
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200">
            <Settings className="w-4 h-4" /> Settings
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" /> Dark Mode
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDrawer;

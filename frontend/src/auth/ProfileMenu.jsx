//.............after remove coin and streak logic ............

//04/09/2026
// File: src/auth/ProfileMenu.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion"; // for animations

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Logout handler
  const handleLogout = async () => {
    await logout();
    setOpen(false);
    window.location.href = "/";
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-700 transition-colors"
      >
        {user?.name || "Profile"}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-gray-900 text-gray-200 shadow-xl rounded-lg overflow-hidden z-50 border border-gray-700"
          >
            <div className="px-4 py-2 text-sm text-gray-400">
              Signed in as <strong>{user?.role}</strong>
            </div>

            <hr className="border-gray-700 my-1" />

            {/* Quick Actions */}
            <div className="flex flex-col">
              <Link
                to="/settings"
                className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                ⚙️ Settings
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  🛠 Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-500 hover:bg-gray-700 transition-colors text-left"
              >
                ⬅ Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;

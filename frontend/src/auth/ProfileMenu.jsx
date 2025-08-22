// File: src/auth/ProfileMenu.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    window.location.href = "/"; // Go to homepage
  };

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
      <button
        onClick={() => setOpen(!open)}
        className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
      >
        {user?.name || "Profile"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 overflow-hidden dark:bg-gray-800">
          <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
            Signed in as <strong>{user?.role}</strong>
          </div>
          <hr />
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

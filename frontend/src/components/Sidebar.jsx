// frontend/src/components/Sidebar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import baseNavItems from "../config/navItems";
import ProfileDrawer from "./ProfileDrawer";

const Sidebar = ({ isOpen, onClose, user, onAuthRequest }) => {
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-lg flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 dark:bg-gray-800">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            Menu
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {baseNavItems.map((item) => {
            if (item.role === "admin" && user?.role !== "admin") return null;
            const Icon = item.icon;

            if (item.guestProtected && !user) {
              return (
                <button
                  key={item.to}
                  onClick={() => {
                    onAuthRequest?.();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center gap-3 py-2 px-3 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
              >
                <Icon className="w-4 h-4 text-gray-500" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile/Register */}
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
          {!user ? (
            <button
              onClick={() => {
                onAuthRequest?.();
                onClose();
              }}
              className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold text-sm hover:bg-yellow-300"
            >
              Register
            </button>
          ) : (
            <button
              onClick={() => setShowProfileDrawer(true)}
              className="w-full bg-gray-100 dark:bg-gray-700 py-2 rounded-md font-medium text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {user?.name || "My Profile"}
            </button>
          )}
        </div>
      </motion.aside>

      {/* Profile Drawer */}
      <ProfileDrawer
        show={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
      />
    </>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import baseNavItems from "../config/navItems";
import ProfileDrawer from "./ProfileDrawer";

const Sidebar = ({ isOpen, onClose, user, onAuthRequest }) => {
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-surface-deep flex flex-col"
          >
            {}
            <div className="flex items-center justify-between p-4 h-16 border-b border-border-subtle">
              <span className="font-mono text-headline-md font-bold text-on-surface">Ashish Kumar</span>
              <button
                onClick={onClose}
                className="p-2 rounded hover:bg-white/5 text-on-surface"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {}
            <nav className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
              {baseNavItems.map((item) => {
                if (item.role === "admin" && user?.role !== "admin") return null;
                const isActive = location.pathname === item.to;
                
                const linkClass = `label-caps text-lg transition-colors text-left ${
                  isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`;

                if (item.guestProtected && !user) {
                  return (
                    <button
                      key={item.to}
                      onClick={() => {
                        onAuthRequest?.();
                        onClose();
                      }}
                      className={linkClass}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={linkClass}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {}
            <div className="p-6 border-t border-border-subtle">
              {!user ? (
                <button
                  onClick={() => {
                    onAuthRequest?.();
                    onClose();
                  }}
                  className="btn-ghost w-full mb-4"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => setShowProfileDrawer(true)}
                  className="btn-ghost w-full mb-4"
                >
                  {user?.name || "My Profile"}
                </button>
              )}
              
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary w-full block text-center rounded-none"
              >
                RESUME
              </a>
            </div>
          </motion.div>

          {}
          <ProfileDrawer
            show={showProfileDrawer}
            onClose={() => setShowProfileDrawer(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import ProfileMenu from "../auth/ProfileMenu";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";
import baseNavItems from "../config/navItems";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProtectedClick = (to) => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-glass backdrop-blur-glass border-b border-border-subtle h-16">
        <div className="section-container h-full flex items-center justify-between">
          {}
          <Link to="/" className="font-mono text-headline-md font-bold text-on-surface">
            Ashish Kumar
          </Link>

          {}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-6">
              {baseNavItems.map((item) => {
                if (item.role === "admin" && user?.role !== "admin") return null;
                const isActive = location.pathname === item.to;
                const linkClass = `label-caps transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary pb-1" 
                    : "text-on-surface-variant hover:text-on-surface"
                }`;

                if (item.guestProtected) {
                  return user ? (
                    <li key={item.to}>
                      <Link to={item.to} className={linkClass}>{item.label}</Link>
                    </li>
                  ) : (
                    <li key={item.to}>
                      <button onClick={() => handleProtectedClick(item.to)} className={linkClass}>
                        {item.label}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {}
          <div className="flex items-center gap-4">
            {}
            <Link to="/assistant" className="hidden md:flex items-center justify-center p-2 rounded hover:bg-white/5 text-primary transition-colors">
              <span className="material-symbols-outlined">terminal</span>
            </Link>

            {}
            <div className="hidden md:block">
              {!user ? (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-ghost"
                >
                  Sign In
                </button>
              ) : (
                <ProfileMenu />
              )}
            </div>

            {}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary rounded-none hidden md:block"
            >
              RESUME
            </a>

            {}
            <button
              className="md:hidden p-2 text-on-surface hover:bg-white/5 rounded"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onAuthRequest={() => setShowAuthModal(true)}
      />

      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {}
      <div className="pt-16" />
    </>
  );
};

export default Navbar;

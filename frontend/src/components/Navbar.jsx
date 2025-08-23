// // ✅ src/components/Navbar.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import AuthModal from "../auth/AuthModal";
// import ProfileMenu from "../auth/ProfileMenu";
// import { useAuth } from "../context/AuthContext";
// import { Menu, X } from "lucide-react";

// const Navbar = () => {
//   const { user } = useAuth();
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const baseNavItems = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/projects", label: "Projects" },
//     { to: "/internships", label: "Internships" },
//     { to: "/feedback", label: "Feedback" },
//     { to: "/journey", label: "Journey" },
//     { to: "/blog", label: "Blog" },
//     { to: "/assistant", label: "Assistant/Freelancer" },
//   ];

//   const navItems =
//     user?.role === "admin"
//       ? [...baseNavItems, { to: "/admin", label: "Admin" }]
//       : baseNavItems;

//   return (
//     <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
//       <div className="flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-yellow-400">
//           Ashish<span className="text-white">Bhai</span>
//         </Link>

//         <button
//           className="md:hidden"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         <div className="hidden md:flex items-center gap-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className="text-sm hover:text-yellow-300 font-medium"
//             >
//               {item.label}
//             </Link>
//           ))}
//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-2 py-1 rounded-md text-black text-sm focus:outline-none"
//           />
//           {!user ? (
//             <button
//               onClick={() => setShowAuthModal(true)}
//               className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
//             >
//               Register
//             </button>
//           ) : (
//             <ProfileMenu />
//           )}
//         </div>
//       </div>

//       {/* 📱 Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden mt-2 flex flex-col gap-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className="text-sm hover:text-yellow-300 font-medium px-2 py-1"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-2 py-1 rounded-md text-black text-sm focus:outline-none"
//           />
//           {!user ? (
//             <button
//               onClick={() => {
//                 setShowAuthModal(true);
//                 setIsMobileMenuOpen(false);
//               }}
//               className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
//             >
//               Register
//             </button>
//           ) : (
//             <ProfileMenu />
//           )}
//         </div>
//       )}

//       {/* 🔁 Auth Modal */}
//       <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
//     </nav>
//   );
// };

// export default Navbar;

// ✅ src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import ProfileMenu from "../auth/ProfileMenu";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProtectedClick = (e, to) => {
    if (!user) {
      e.preventDefault();
      toast.info("Please register to access this feature!");
    } else {
      navigate(to);
    }
  };

  const baseNavItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    {
      to: "/fresher-opportunities",
      label: "Fresher Opportunities",
      guestProtected: true, // 👈 flag
    },

    {
      to: "/feedback",
      label: "Feedback",
      guestProtected: true,
    },
    {
      to: "/blog",
      label: "Blog",
      guestProtected: true,
    },
    { to: "/journey", label: "Journey" },
    { to: "/assistant", label: "Assistant/Freelancer" },
  ];

  const navItems =
    user?.role === "admin"
      ? [...baseNavItems, { to: "/admin", label: "Admin" }]
      : baseNavItems;

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          Stone<span className="text-white">Byte</span>
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.guestProtected ? (
              <span
                key={item.to}
                onClick={(e) => handleProtectedClick(e, item.to)}
                className="text-sm cursor-pointer hover:text-yellow-300 font-medium"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm hover:text-yellow-300 font-medium"
              >
                {item.label}
              </Link>
            )
          )}
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded-md text-black text-sm focus:outline-none"
          />
          {!user ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
            >
              Register
            </button>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2">
          {navItems.map((item) =>
            item.guestProtected ? (
              <span
                key={item.to}
                onClick={(e) => handleProtectedClick(e, item.to)}
                className="text-sm cursor-pointer hover:text-yellow-300 font-medium px-2 py-1"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm hover:text-yellow-300 font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded-md text-black text-sm focus:outline-none"
          />
          {!user ? (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setIsMobileMenuOpen(false);
              }}
              className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
            >
              Register
            </button>
          ) : (
            <ProfileMenu />
          )}
        </div>
      )}

      {/* 🔁 Auth Modal */}
      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default Navbar;

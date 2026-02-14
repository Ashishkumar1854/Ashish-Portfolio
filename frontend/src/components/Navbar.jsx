//feb 2026 14 feb
// // frontend/src/components/Navbar.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthModal from "../auth/AuthModal";
// import ProfileMenu from "../auth/ProfileMenu";
// import { useAuth } from "../context/AuthContext";
// import { Menu } from "lucide-react";
// import baseNavItems from "../config/navItems";
// import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const { user } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const navigate = useNavigate();

//   const handleProtectedClick = (to) => {
//     if (!user) {
//       setShowAuthModal(true);
//     } else {
//       navigate(to);
//     }
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14">
//             {/* Left: Logo */}
//             <div className="flex items-center">
//               <Link to="/" className="text-xl font-bold text-blue-600">
//                 Ashish<span className="text-gray-800">Portfolio</span>
//               </Link>
//             </div>

//             {/* Center: Links */}
//             <nav className="hidden md:flex flex-1 justify-center">
//               <ul className="flex gap-6 items-center text-sm font-medium">
//                 {baseNavItems.map((item) => {
//                   if (item.role === "admin" && user?.role !== "admin")
//                     return null;

//                   const content = item.guestProtected ? (
//                     user ? (
//                       <Link
//                         key={item.to}
//                         to={item.to}
//                         className="text-gray-700 hover:text-blue-600 transition"
//                       >
//                         {item.label}
//                       </Link>
//                     ) : (
//                       <button
//                         key={item.to}
//                         onClick={() => handleProtectedClick(item.to)}
//                         className="text-gray-700 hover:text-blue-600 transition"
//                       >
//                         {item.label}
//                       </button>
//                     )
//                   ) : (
//                     <Link
//                       key={item.to}
//                       to={item.to}
//                       className="text-gray-700 hover:text-blue-600 transition"
//                     >
//                       {item.label}
//                     </Link>
//                   );

//                   return <li key={item.to}>{content}</li>;
//                 })}
//               </ul>
//             </nav>

//             {/* Right: Search + Auth + Mobile Hamburger */}
//             <div className="flex items-center gap-4">
//               {/* Profile/Register */}
//               <div className="hidden md:block">
//                 {!user ? (
//                   <button
//                     onClick={() => setShowAuthModal(true)}
//                     className="bg-yellow-400 text-black px-3 py-1.5 rounded-md font-semibold text-sm hover:bg-yellow-300 transition"
//                   >
//                     Register
//                   </button>
//                 ) : (
//                   <ProfileMenu />
//                 )}
//               </div>

//               {/* Mobile Hamburger on right */}
//               <div className="md:hidden">
//                 <button
//                   className="p-2 rounded-md hover:bg-gray-100"
//                   onClick={() => setIsSidebarOpen(true)}
//                   aria-label="Open menu"
//                 >
//                   <Menu className="w-6 h-6 text-gray-700" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         user={user}
//         onAuthRequest={() => setShowAuthModal(true)}
//       />

//       {/* Auth Modal */}
//       <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />

//       {/* To prevent hero overlap */}
//       <div className="pt-16"></div>
//     </>
//   );
// };

// export default Navbar;

//date 02 december
// frontend/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleProtectedClick = (to) => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-60">
        <div className="max-w-10xl mx-auto px-6 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo (image) */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2"
                aria-label="Ashish Portfolio Home"
              >
                <img
                  src="/portfolioLogo.png"
                  alt="AshishPortfolio"
                  title="AshishPortfolio"
                  className="h-12 w-auto object-contain"
                />
                {/* If you still want a tiny text next to the image (optional), uncomment:
                <span className="sr-only">AshishPortfolio</span>
                */}
              </Link>
            </div>

            {/* Center: Links */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex gap-6 items-center text-sm font-medium">
                {baseNavItems.map((item) => {
                  if (item.role === "admin" && user?.role !== "admin")
                    return null;

                  const content = item.guestProtected ? (
                    user ? (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.to}
                        onClick={() => handleProtectedClick(item.to)}
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        {item.label}
                      </button>
                    )
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      {item.label}
                    </Link>
                  );

                  return <li key={item.to}>{content}</li>;
                })}
              </ul>
            </nav>

            {/* Right: Search + Auth + Mobile Hamburger */}
            <div className="flex items-center gap-4">
              {/* Profile/Register */}
              <div className="hidden md:block">
                {!user ? (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-yellow-400 text-black px-3 py-1.5 rounded-md font-semibold text-sm hover:bg-yellow-300 transition"
                  >
                    Register
                  </button>
                ) : (
                  <ProfileMenu />
                )}
              </div>

              {/* Mobile Hamburger on right */}
              <div className="md:hidden">
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onAuthRequest={() => setShowAuthModal(true)}
      />

      {/* Auth Modal */}
      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* To prevent hero overlap */}
      <div className="pt-16" />
    </>
  );
};

export default Navbar;

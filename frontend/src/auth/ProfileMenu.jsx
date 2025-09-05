// // File: src/auth/ProfileMenu.jsx

// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProfileMenu = () => {
//   const { user, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef();

//   const handleLogout = async () => {
//     await logout();
//     setOpen(false);
//     window.location.href = "/"; // Go to homepage
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
//       >
//         {user?.name || "Profile"}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 overflow-hidden dark:bg-gray-800">
//           <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
//             Signed in as <strong>{user?.role}</strong>
//           </div>
//           <hr />
//           {user?.role === "admin" && (
//             <Link
//               to="/admin"
//               className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//               onClick={() => setOpen(false)}
//             >
//               Admin Panel
//             </Link>
//           )}
//           <button
//             onClick={handleLogout}
//             className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileMenu;

// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// const ProfileMenu = () => {
//   const { user, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [coins, setCoins] = useState(0); // 💰 User coins
//   const [streak, setStreak] = useState(0); // 🔥 Daily streak
//   const menuRef = useRef();

//   // ✅ Fetch user coins + streak when menu opens
//   useEffect(() => {
//     if (open && user?._id) {
//       const fetchCoinsAndStreak = async () => {
//         try {
//           const res = await axios.get("http://localhost:5001/api/coins", {
//             withCredentials: true,
//           });
//           setCoins(res.data.coins || 0);
//           setStreak(res.data.dailyStreak || 0);
//         } catch (err) {
//           console.error("❌ Failed to fetch coins/streak:", err);
//           setCoins(0);
//           setStreak(0);
//         }
//       };
//       fetchCoinsAndStreak();
//     }
//   }, [open, user]);

//   // ✅ Logout handler
//   const handleLogout = async () => {
//     await logout();
//     setOpen(false);
//     window.location.href = "/"; // Redirect to homepage
//   };

//   // ✅ Close menu when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={menuRef}>
//       {/* Profile Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold text-sm hover:bg-yellow-300"
//       >
//         {user?.name || "Profile"}
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md z-50 overflow-hidden dark:bg-gray-800">
//           <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
//             Signed in as <strong>{user?.role}</strong>
//           </div>

//           {/* 💰 Coins & 🔥 Streak */}
//           {user && (
//             <>
//               <div className="px-4 py-2 text-sm text-yellow-600 font-semibold flex items-center justify-between">
//                 <span>💰 Coins</span>
//                 <span>{coins}</span>
//               </div>
//               <div className="px-4 py-2 text-sm text-blue-600 font-semibold flex items-center justify-between">
//                 <span>🔥 Streak</span>
//                 <span>{streak} days</span>
//               </div>
//             </>
//           )}

//           <hr />

//           {/* Admin Panel Link */}
//           {user?.role === "admin" && (
//             <Link
//               to="/admin"
//               className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//               onClick={() => setOpen(false)}
//             >
//               Admin Panel
//             </Link>
//           )}

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileMenu;

//04/09/2026

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // for animations

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const menuRef = useRef();

  // Fetch coins and streak
  useEffect(() => {
    if (open && user?._id) {
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
  }, [open, user]);

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

            {/* Coins & Streak */}
            {user && (
              <>
                <div className="px-4 py-2 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors rounded-md mx-2 my-1">
                  <span className="text-yellow-400 font-semibold">
                    💰 Coins
                  </span>
                  <motion.span
                    key={coins}
                    initial={{ count: 0 }}
                    animate={{ count: coins }}
                    transition={{ duration: 0.8 }}
                  >
                    {coins}
                  </motion.span>
                </div>

                <div className="px-4 py-2 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors rounded-md mx-2 my-1">
                  <span className="text-blue-400 font-semibold">🔥 Streak</span>
                  <motion.span
                    key={streak}
                    initial={{ count: 0 }}
                    animate={{ count: streak }}
                    transition={{ duration: 0.8 }}
                  >
                    {streak} days
                  </motion.span>
                </div>
              </>
            )}

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

// // File: src/context/AuthContext.jsx

// import React, { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/api/profile", {
//           withCredentials: true,
//         });
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5001/api/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       setUser(null);
//     } catch (err) {
//       console.log("Logout failed", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// File: src/context/AuthContext.jsx

// import React, { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/api/profile", {
//           withCredentials: true,
//         });
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const login = async (formData) => {
//     const res = await axios.post(
//       "http://localhost:5001/api/auth/login",
//       formData,
//       { withCredentials: true }
//     );
//     console.log("🔐 Logged in user:", res.data.user);
//     setUser(res.data.user);
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5001/api/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       setUser(null);
//     } catch (err) {
//       console.log("Logout failed", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

//           16/07/2025

import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user profile (with role)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/profile", {
          withCredentials: true,
        });

        // ✅ Check if role exists and set user
        if (res.data?.role) {
          setUser(res.data); // Example: { name, email, role: 'admin' }
        } else {
          console.warn("⚠️ Role missing in response");
          setUser(null);
        }
      } catch (err) {
        console.error("❌ Failed to fetch profile:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Login Function
  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("🔐 Logged in user:", res.data.user);

      if (res.data.user?.role) {
        setUser(res.data.user);
      } else {
        console.warn("⚠️ Role missing in login response");
        setUser(null);
      }
    } catch (err) {
      console.error("❌ Login failed", err);
      throw err;
    }
  };

  // ✅ Logout Function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (err) {
      console.error("❌ Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

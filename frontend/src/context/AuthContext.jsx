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

// import React, { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";

// // ✅ Auth Context create
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch logged-in user profile (with role)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/api/profile", {
//           withCredentials: true,
//         });

//         // ✅ Check if role exists and set user
//         if (res.data?.role) {
//           setUser(res.data); // Example: { name, email, role: 'admin' }
//         } else {
//           console.warn("⚠️ Role missing in response");
//           setUser(null);
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch profile:", err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // ✅ Login Function
//   const login = async (formData) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5001/api/auth/login",
//         formData,
//         { withCredentials: true }
//       );

//       console.log("🔐 Logged in user:", res.data.user);

//       if (res.data.user?.role) {
//         setUser(res.data.user);
//       } else {
//         console.warn("⚠️ Role missing in login response");
//         setUser(null);
//       }
//     } catch (err) {
//       console.error("❌ Login failed", err);
//       throw err;
//     }
//   };

//   // ✅ Logout Function
//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5001/api/logout",
//         {},
//         { withCredentials: true }
//       );
//       setUser(null);
//     } catch (err) {
//       console.error("❌ Logout failed", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom hook for easier usage
// export const useAuth = () => useContext(AuthContext);

// // src/context/AuthContext.jsx
// import React, { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // fetch profile once at app start
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await axios.get(
//           `${
//             process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"
//           }/api/profile`,
//           { withCredentials: true }
//         );
//         if (!mounted) return;
//         // backend may return user object directly
//         if (res.data) {
//           setUser(res.data);
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         setUser(null);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => (mounted = false);
//   }, []);

//   const login = async (formData) => {
//     const res = await axios.post(
//       `${
//         process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"
//       }/api/auth/login`,
//       formData,
//       { withCredentials: true }
//     );
//     // after login backend should set cookie and return user
//     if (res.data?.user) setUser(res.data.user);
//     return res.data;
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         `${
//           process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"
//         }/api/logout`,
//         {},
//         { withCredentials: true }
//       );
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

//30/08
// src/context/AuthContext.jsx
// import React, { createContext, useEffect, useState, useContext } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"
//         }/api/profile`,
//         { withCredentials: true }
//       );
//       setUser(res.data || null);
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const login = async (formData) => {
//     const res = await axios.post(
//       `${
//         process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"
//       }/api/auth/login`,
//       formData,
//       { withCredentials: true }
//     );
//     if (res.data?.user) setUser(res.data.user);
//     return res.data;
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         `${
//           process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"
//         }/api/logout`,
//         {},
//         { withCredentials: true }
//       );
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   // ✅ Refresh profile (e.g., after coins update)
//   const refreshUser = async () => {
//     await fetchProfile();
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, login, logout, refreshUser, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

//04/09

// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Base URL (from env or local)
  const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

  // ✅ Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        withCredentials: true,
      });
      setUser(res.data || null);
    } catch (err) {
      console.error("❌ Fetch profile failed:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-fetch on mount
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⚡ Login
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, formData, {
        withCredentials: true,
      });
      if (res.data?.user) setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      throw err;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    }
  };

  // 🔄 Refresh user (e.g. after coins update or profile edit)
  const refreshUser = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, refreshUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);

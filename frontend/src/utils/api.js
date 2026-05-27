


import axios from "axios";

const resolveBaseUrl = () => {
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }

  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5001";
    }
  }

  return "https://ashish-portfolio-3.onrender.com";
};

const API = axios.create({
  baseURL: resolveBaseUrl(),
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log("➡️ Request:", req.url, req.data);
  return req;
});

API.interceptors.response.use(
  (res) => {
    console.log("⬅️ Response:", res.data);
    return res;
  },
  (err) => {
    console.error("❌ Error:", err.response || err);
    throw err;
  }
);

export default API;

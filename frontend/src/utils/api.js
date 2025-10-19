// //📁 frontend/src/utils/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   withCredentials: true,
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
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

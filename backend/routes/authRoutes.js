// // 📦 Importing dependencies
// const express = require("express");
// const router = express.Router();

// // 🔐 Importing controllers
// const {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getProfile,
//   forgotPassword,
//   resetPassword,
//   sendOTP,
//   verifyOTP,
//   verifyEmail, // ✅ newly added
// } = require("../controllers/authController");

// // 🔒 Auth middleware for protected routes
// const { protect } = require("../middleware/authMiddleware");

// // ✅ AUTHENTICATION ROUTES
// router.post("/register", registerUser); // 🔐 Register (admin/user)
// router.post("/login", loginUser); // 🔑 Login
// router.post("/logout", logoutUser); // 🚪 Logout
// router.get("/profile", protect, getProfile); // 👤 Authenticated user profile

// // 🔁 FORGOT & RESET PASSWORD
// router.post("/forgot-password", forgotPassword); // 🔓 Send reset link
// router.post("/reset-password/:token", resetPassword); // 🔑 Reset password

// // 🔢 OTP LOGIN FLOW
// router.post("/send-otp", sendOTP); // Step 1: Send OTP to email
// router.post("/verify-otp", verifyOTP); // Step 2: Verify and login

// // ✅ EMAIL VERIFICATION ROUTE (newly added)
// router.get("/verify-email/:token", verifyEmail); // ✅ verify email via token

// // ✅ Check if user exists (for OTP-based login)
// router.post("/check-user", async (req, res) => {
//   const { email } = req.body;
//   const user = await require("../models/User").findOne({ email });
//   res.json({ exists: !!user });
// });

// // ✅ Export the router
// module.exports = router;

// 📦 Importing dependencies
const express = require("express");
const router = express.Router();

// 🔐 Importing controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  forgotPassword,
  resetPassword,
  sendOTP,
  verifyOTP,
  verifyEmail, // ✅ newly added
} = require("../controllers/authController");

// 🔒 Auth middleware for protected routes
const { protect } = require("../middleware/authMiddleware");

// 🧠 Debug Middleware (to check cookies in every auth route)
router.use((req, res, next) => {
  console.log("🧠 [AUTH ROUTE DEBUG] Path:", req.path);
  console.log("Cookies received:", req.cookies);
  next();
});

// ✅ AUTHENTICATION ROUTES
router.post("/register", registerUser); // 🔐 Register (admin/user)
router.post("/login", loginUser); // 🔑 Login
router.post("/logout", logoutUser); // 🚪 Logout
router.get("/profile", protect, getProfile); // 👤 Authenticated user profile

// 🔁 FORGOT & RESET PASSWORD
router.post("/forgot-password", forgotPassword); // 🔓 Send reset link
router.post("/reset-password/:token", resetPassword); // 🔑 Reset password

// 🔢 OTP LOGIN FLOW
router.post("/send-otp", sendOTP); // Step 1: Send OTP to email
router.post("/verify-otp", verifyOTP); // Step 2: Verify and login

// ✅ EMAIL VERIFICATION ROUTE (newly added)
router.get("/verify-email/:token", verifyEmail); // ✅ verify email via token

// ✅ Check if user exists (for OTP-based login)
router.post("/check-user", async (req, res) => {
  const { email } = req.body;
  const user = await require("../models/User").findOne({ email });
  res.json({ exists: !!user });
});

// ✅ Export the router
module.exports = router;

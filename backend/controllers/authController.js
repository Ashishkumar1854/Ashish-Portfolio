// // 📦 Importing dependencies
// const User = require("../models/User");
// const generateToken = require("../utils/generateToken");
// const bcrypt = require("bcrypt");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const otpStore = new Map();

// // ✅ Send Email Verification
// const sendVerificationEmail = async (user) => {
//   const emailToken = crypto.randomBytes(32).toString("hex");
//   user.emailToken = emailToken;
//   await user.save();

//   const verifyLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

//   await sendEmail(
//     user.email,
//     "📩 Verify Your Email - Ashish Bhai",
//     `<p>Hello ${user.name},</p><p>Please verify your email by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`
//   );

//   console.log("📤 Verification email sent to", user.email);
// };

// // ✅ Register New User
// // ✅ Register New User (Updated without email verification)
// exports.registerUser = async (req, res) => {
//   try {
//     let { name, email, password, role } = req.body;

//     const allowedAdmins = [
//       "ashishkyadav.dev@gmail.com",
//       "kashish84396@gmail.com",
//     ];
//     const isAdmin = allowedAdmins.includes(email.toLowerCase());

//     if (role === "admin" && !isAdmin) {
//       return res
//         .status(403)
//         .json({ message: "❌ You are not allowed to register as admin" });
//     }

//     if (isAdmin && password !== "Ashish@1854") {
//       return res
//         .status(403)
//         .json({ message: "❌ Admin password is incorrect" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "Email already exists" });

//     role = isAdmin ? "admin" : "user";

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//       isVerified: true, // No verification needed
//     });

//     // ✅ Send confirmation email (no verify link)
//     await sendEmail(
//       user.email,
//       "🎉 Registration Successful - Ashish Bhai",
//       `<p>Hello ${user.name},</p><p>Your account has been successfully created.</p><p>Welcome to the Ashish Bhai family! 😎</p>`
//     );

//     res.status(201).json({
//       message: "✅ Registered successfully. Welcome email sent.",
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Registration failed", error: error.message });
//   }
// };

// // ✅ Login User
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id, user.role);

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         user: {
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };

// // ✅ Verify Email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const user = await User.findOne({ emailToken: req.params.token });
//     if (!user) return res.status(400).send("Invalid or expired token");

//     user.isVerified = true;
//     user.emailToken = null;
//     await user.save();

//     res.redirect(`${process.env.CLIENT_URL}/login`);
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// };

// // ✅ Logout User
// exports.logoutUser = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Lax",
//     });
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout failed", error: error.message });
//   }
// };

// // ✅ Get Profile
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch profile", error: error.message });
//   }
// };

// // ✅ Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User with email not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetToken = resetToken;
//     user.resetTokenExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//     await sendEmail(
//       email,
//       "🔑 Reset Password - Ashish Bhai",
//       `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
//     );

//     res.json({ message: "Password reset link sent to your email" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to send reset link", error: error.message });
//   }
// };

// // ✅ Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
//     console.log("🔍 Received token:", token);

//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpires: { $gt: Date.now() },
//     });
//     console.log("🔍 User found:", user);

//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired token" });

//     user.password = password; // ✅ Let pre('save') hash it
//     user.resetToken = undefined;
//     user.resetTokenExpires = undefined;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Reset failed", error: error.message });
//   }
// };

// // ✅ Send OTP
// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore.set(email, otp);

//     await sendEmail(
//       email,
//       "🔢 Your OTP - Ashish Bhai",
//       `<p>Your OTP is: <strong>${otp}</strong></p>`
//     );

//     res.json({ message: "OTP sent to email" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to send OTP", error: error.message });
//   }
// };

// // ✅ Verify OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const storedOtp = otpStore.get(email);

//     if (!storedOtp || storedOtp !== otp) {
//       return res.status(401).json({ message: "Invalid or expired OTP" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const token = generateToken(user._id, user.role);

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         user: {
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       });

//     otpStore.delete(email);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "OTP verification failed", error: error.message });
//   }
// };

// Importing dependencies
// const User = require("../models/User");
// const generateToken = require("../utils/generateToken");
// const bcrypt = require("bcrypt");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const otpStore = new Map();

// // ✅ Send Email Verification
// const sendVerificationEmail = async (user) => {
//   const emailToken = crypto.randomBytes(32).toString("hex");
//   user.emailToken = emailToken;
//   await user.save();

//   const verifyLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

//   await sendEmail(
//     user.email,
//     "📩 Verify Your Email - Ashish Bhai",
//     `<p>Hello ${user.name},</p><p>Please verify your email by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`
//   );

//   console.log("📤 Verification email sent to", user.email);
// };

// // ✅ Register New User
// // ✅ Register New User (Updated without email verification)
// exports.registerUser = async (req, res) => {
//   try {
//     let { name, email, password, role } = req.body;

//     const allowedAdmins = [
//       "ashishkyadav.dev@gmail.com",
//       "kashish84396@gmail.com",
//     ];
//     const isAdmin = allowedAdmins.includes(email.toLowerCase());

//     if (role === "admin" && !isAdmin) {
//       return res
//         .status(403)
//         .json({ message: "❌ You are not allowed to register as admin" });
//     }

//     if (isAdmin && password !== "Ashish@1854") {
//       return res
//         .status(403)
//         .json({ message: "❌ Admin password is incorrect" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "Email already exists" });

//     role = isAdmin ? "admin" : "user";

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//       isVerified: true, // No verification needed
//     });

//     // ✅ Send confirmation email (no verify link)
//     await sendEmail(
//       user.email,
//       "🎉 Registration Successful - Ashish Bhai",
//       `<p>Hello ${user.name},</p><p>Your account has been successfully created.</p><p>Welcome to the Ashish Bhai family! 😎</p>`
//     );

//     res.status(201).json({
//       message: "✅ Registered successfully. Welcome email sent.",
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Registration failed", error: error.message });
//   }
// };

// // ✅ Login User
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     // ✅ Compare password using schema method
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       console.log("❌ Password not matched");
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id, user.role);

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         user: {
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       });
//   } catch (error) {
//     console.error("💥 Login error:", error);
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };

// // ✅ Verify Email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const user = await User.findOne({ emailToken: req.params.token });
//     if (!user) return res.status(400).send("Invalid or expired token");

//     user.isVerified = true;
//     user.emailToken = null;
//     await user.save();

//     res.redirect(`${process.env.CLIENT_URL}/login`);
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// };

// // ✅ Logout User
// exports.logoutUser = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Lax",
//     });
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout failed", error: error.message });
//   }
// };

// // ✅ Get Profile
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch profile", error: error.message });
//   }
// };

// // ✅ Forgot Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User with email not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetToken = resetToken;
//     user.resetTokenExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//     await sendEmail(
//       email,
//       "🔑 Reset Password - Ashish Bhai",
//       `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
//     );

//     res.json({ message: "Password reset link sent to your email" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to send reset link", error: error.message });
//   }
// };

// // ✅ Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
//     console.log("🔍 Received token:", token);

//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpires: { $gt: Date.now() },
//     });
//     console.log("🔍 User found:", user);

//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired token" });

//     user.password = password; // ✅ Let pre('save') hash it
//     user.resetToken = undefined;
//     user.resetTokenExpires = undefined;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Reset failed", error: error.message });
//   }
// };

// // ✅ Send OTP
// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore.set(email, otp);

//     await sendEmail(
//       email,
//       "🔢 Your OTP - Ashish Bhai",
//       `<p>Your OTP is: <strong>${otp}</strong></p>`
//     );

//     res.json({ message: "OTP sent to email" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to send OTP", error: error.message });
//   }
// };

// // ✅ Verify OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const storedOtp = otpStore.get(email);

//     if (!storedOtp || storedOtp !== otp) {
//       return res.status(401).json({ message: "Invalid or expired OTP" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const token = generateToken(user._id, user.role);

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         user: {
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       });

//     otpStore.delete(email);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "OTP verification failed", error: error.message });
//   }
// };

// .........with confirmation + sms  emial notification..........

// 📦 Importing dependencies
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
require("dotenv").config();
const otpStore = new Map();

// ✅ Register New User
exports.registerUser = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    const allowedAdmins = [
      "ashishkyadav.dev@gmail.com",
      "kashish84396@gmail.com",
    ];
    const isAdmin = allowedAdmins.includes(email.toLowerCase());

    if (role === "admin" && !isAdmin) {
      return res
        .status(403)
        .json({ message: "❌ You are not allowed to register as admin" });
    }

    if (isAdmin && password !== "Ashish@1854") {
      return res
        .status(403)
        .json({ message: "❌ Admin password is incorrect" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    role = isAdmin ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password,
      role,
      isVerified: true,
    });

    // ✅ Send confirmation email
    await sendEmail(
      user.email,
      "🎉 Welcome to Ashish Bhai Community!",
      `
        <p>Hey <strong>${user.name}</strong>,</p>
        <p>✅ You're now officially part of the <strong>Ashish Bhai</strong> tech family! 🔥</p>
        <hr style="margin: 16px 0;"/>
        <h3>🚀 Here's what you get access to:</h3>
        <ul style="line-height: 1.6; font-size: 15px;">
          <li>💼 <strong>Latest Internship & Job Alerts</strong> directly from top companies</li>
          <li>📘 <strong>Exclusive Tech Blogs</strong> to boost your skills</li>
          <li>💻 <strong>Freelancing Gigs & Projects</strong> - Start earning right now</li>
          <li>🔍 <strong>Direct Links to Company Careers</strong> - No more searching around</li>
        </ul>
        <p style="margin-top: 20px;">
          🔔 Make sure to check our dashboard daily for new updates and hidden opportunities!
        </p>
        <a href="${process.env.CLIENT_URL}"
          style="display: inline-block; margin-top: 20px; padding: 10px 16px; background-color: #10b981; color: #fff; border-radius: 6px; text-decoration: none;">
          Explore Dashboard Now 🚀
        </a>
        <p style="margin-top: 30px;">Cheers,<br/>💚 <strong>Team Ashish Bhai</strong></p>
      `
    );

    res.status(201).json({
      message: "✅ Registered successfully. Confirmation email sent.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    await sendEmail(
      user.email,
      "✅ Login Alert - Ashish Bhai",
      `
      <p>Hey ${user.name},</p>
      <p>You just logged in successfully to <strong>Ashish Bhai</strong> platform.</p>
      <p>If this wasn't you, please reset your password immediately.</p>
      <p><a href="${process.env.CLIENT_URL}/reset-password">Reset Password</a></p>
      `
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ✅ Logout User
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

// ✅ Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

// ✅ Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User with email not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "🔑 Reset Your Password - Ashish Bhai",
      `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    );

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send reset link", error: error.message });
  }
};

// ✅ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Reset failed", error: error.message });
  }
};

// ✅ Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);

    await sendEmail(
      email,
      "🔢 Your OTP - Ashish Bhai",
      `<p>Your OTP is: <strong>${otp}</strong></p>`
    );

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

// ✅ Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);

    if (!storedOtp || storedOtp !== otp) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = generateToken(user._id, user.role);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    otpStore.delete(email);
  } catch (error) {
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
};

// ✅ Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailToken: req.params.token });
    if (!user) return res.status(400).send("Invalid or expired token");

    user.isVerified = true;
    user.emailToken = null;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/login`);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

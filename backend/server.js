// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const cookieParser = require("cookie-parser");
// const path = require("path"); // ✅ Correctly added here
// require("dotenv").config();

// // ✅ Import Routes
// const authRoutes = require("./routes/authRoutes");
// const homeRoutes = require("./routes/homeRoutes");
// const teamRoutes = require("./routes/teamRoutes");
// const serviceRoutes = require("./routes/serviceRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const skillsRoutes = require("./routes/skillsRoutes"); // make sure you actually created this
// const visionRoutes = require("./routes/visionRoutes");
// const pageARoutes = require("./routes/pageARoutes");
// const pageBRoutes = require("./routes/pageBRoutes");
// const pageCRoutes = require("./routes/pageCRoutes");
// const pageDRoutes = require("./routes/pageDRoutes");

// // ✅ Initialize App
// const app = express();
// const PORT = process.env.PORT || 5001;

// // ✅ Connect to Database
// connectDB();

// // ✅ Middleware Setup (Only Once)
// app.use(
//   cors({
//     origin: "http://localhost:3000", // your frontend URL
//     credentials: true, // 🔐 To allow cookies/session
//   })
// );
// app.use(express.json()); // 🧾 Parse JSON body
// app.use(cookieParser()); // 🍪 Parse cookies

// // ✅ Static serve your PDF folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Logging Middleware (Use before routes to debug request)
// app.use((req, res, next) => {
//   console.log("---- Incoming Request ----");
//   console.log("Path:", req.path);
//   console.log("Method:", req.method);
//   console.log("Body:", req.body);
//   console.log("Cookies:", req.cookies);
//   console.log("--------------------------");
//   next();
// });

// // ✅ ✅ ✅ FIXED: Auth Routes Path
// app.use("/api/auth", authRoutes); // ✅ Now works with /api/auth/register

// // ✅ Other API Routes
// app.use("/api/home", homeRoutes); // 🏠 Homepage data
// app.use("/api/home/skills", skillsRoutes); // 🛠 Skills Section
// app.use("/api/vision", visionRoutes); // 🔭 Vision Section
// app.use("/api/home/pageA", pageARoutes); // 📄 Page A under home
// app.use("/api/home/pageB", pageBRoutes);
// app.use("/api/home/pageC", pageCRoutes);
// app.use("/api/home/pageD", pageDRoutes);

// app.use("/api/team", teamRoutes); // 👥 Team Section
// app.use("/api/services", serviceRoutes); // 💼 Services
// app.use("/api/contacts", contactRoutes); // 📬 Contact Form

// // ✅ Root Test Route
// app.get("/", (req, res) => {
//   res.send("API Working ✅");
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server Running at http://localhost:${PORT}`);
// });

// 16 august

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const visionRoutes = require("./routes/visionRoutes");
const pageARoutes = require("./routes/pageARoutes");
const pageBRoutes = require("./routes/pageBRoutes");
const pageCRoutes = require("./routes/pageCRoutes");
const pageDRoutes = require("./routes/pageDRoutes");
const aboutRoutes = require("./routes/aboutRoutes"); // ✅ Only About routes now
const blogRoutes = require("./routes/blogRoutes"); // ✅ Add this
const coinRoutes = require("./routes/coinRoutes"); // ✅ Add this

// ✅ Initialize App
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Connect to Database
connectDB();

// ✅ Middleware Setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Logging Middleware
app.use((req, res, next) => {
  console.log("---- Incoming Request ----");
  console.log("Path:", req.path);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Cookies:", req.cookies);
  console.log("--------------------------");
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/home/skills", skillsRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/home/pageA", pageARoutes);
app.use("/api/home/pageB", pageBRoutes);
app.use("/api/home/pageC", pageCRoutes);
app.use("/api/home/pageD", pageDRoutes);

// ✅ About routes (Team, Service, Contact handled via About)
app.use("/api/about", aboutRoutes);

app.use("/api/blog", blogRoutes);
app.use("/api/coins", coinRoutes);

// ✅ Root Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server Running at http://localhost:${PORT}`);
});

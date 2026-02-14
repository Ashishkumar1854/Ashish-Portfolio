// //05/09

// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const dotenv = require("dotenv");
// const cron = require("node-cron");

// // Load env variables
// dotenv.config();

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const homeRoutes = require("./routes/homeRoutes");
// const skillsRoutes = require("./routes/skillsRoutes");
// const visionRoutes = require("./routes/visionRoutes");
// const pageARoutes = require("./routes/pageARoutes");
// const pageBRoutes = require("./routes/pageBRoutes");
// const pageCRoutes = require("./routes/pageCRoutes");
// const pageDRoutes = require("./routes/pageDRoutes");
// const aboutRoutes = require("./routes/aboutRoutes");
// const projectRoutes = require("./routes/projectRoutes");
// const fresherOpportunityRoutes = require("./routes/fresherOpportunityRoutes");
// const feedbackRoutes = require("./routes/feedbackRoutes"); // ⭐ Added
// const blogRoutes = require("./routes/blogRoutes");

// const journeyRoutes = require("./routes/journeyRoutes");
// const assistantRoutes = require("./routes/assistantRoutes");

// const hireRoutes = require("./routes/hireRoutes");
// const adminHireRoutes = require("./routes/adminHireRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// // Controllers for email cron
// const {
//   sendEmailToUsers,
// } = require("./controllers/fresherOpportunityController");

// // Initialize App
// const app = express();
// const PORT = process.env.PORT || 5001;

// // Connect Database
// connectDB();

// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Logging middleware
// app.use((req, res, next) => {
//   console.log("---- Incoming Request ----");
//   console.log("Path:", req.path);
//   console.log("Method:", req.method);
//   console.log("Body:", req.body);
//   console.log("Cookies:", req.cookies);
//   console.log("--------------------------");
//   next();
// });

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/home", homeRoutes);
// app.use("/api/home/skills", skillsRoutes);
// app.use("/api/vision", visionRoutes);
// app.use("/api/home/pageA", pageARoutes);
// app.use("/api/home/pageB", pageBRoutes);
// app.use("/api/home/pageC", pageCRoutes);
// app.use("/api/home/pageD", pageDRoutes);
// app.use("/api/about", aboutRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/fresher-opportunities", fresherOpportunityRoutes);
// app.use("/api/feedback", feedbackRoutes); // ⭐ Feedback API mount
// app.use("/api/blogs", blogRoutes);

// app.use("/api/journey", journeyRoutes);
// app.use("/api/assistant", assistantRoutes);

// app.use("/api", hireRoutes);

// // ✅ Mount under /api/admin with protect + adminAuth middleware
// app.use("/api/admin", adminHireRoutes);

// app.use("/api/admin", adminRoutes);

// // Root test
// app.get("/", (req, res) => {
//   res.send("API Working ✅");
// });

// // Weekly email cron (Every Monday 9 AM)
// cron.schedule("0 9 * * 1", async () => {
//   console.log("Running weekly fresher opportunities email job...");
//   const FresherOpportunity = require("./models/FresherOpportunity");
//   const oneWeekAgo = new Date();
//   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//   const recentOpportunities = await FresherOpportunity.find({
//     createdAt: { $gte: oneWeekAgo },
//   });

//   for (const opp of recentOpportunities) {
//     await sendEmailToUsers(opp);
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server Running at http://localhost:${PORT}`);
// });

// //after deplpyment login issue resolve ke liye

// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const dotenv = require("dotenv");
// const cron = require("node-cron");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5001;

// connectDB();

// // ✅ CORS FIX for Netlify (frontend) → Render (backend)
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 🧠 Debug log middleware
// app.use((req, res, next) => {
//   console.log("---- Incoming Request ----");
//   console.log("Path:", req.path);
//   console.log("Method:", req.method);
//   console.log("Body:", req.body);
//   console.log("Cookies:", req.cookies);
//   console.log("--------------------------");
//   next();
// });

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/home", require("./routes/homeRoutes"));
// app.use("/api/home/skills", require("./routes/skillsRoutes"));
// app.use("/api/vision", require("./routes/visionRoutes"));
// app.use("/api/home/pageA", require("./routes/pageARoutes"));
// app.use("/api/home/pageB", require("./routes/pageBRoutes"));
// app.use("/api/home/pageC", require("./routes/pageCRoutes"));
// app.use("/api/home/pageD", require("./routes/pageDRoutes"));
// app.use("/api/about", require("./routes/aboutRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use(
//   "/api/fresher-opportunities",
//   require("./routes/fresherOpportunityRoutes")
// );
// app.use("/api/feedback", require("./routes/feedbackRoutes"));
// app.use("/api/blogs", require("./routes/blogRoutes"));
// app.use("/api/journey", require("./routes/journeyRoutes"));
// app.use("/api/assistant", require("./routes/assistantRoutes"));
// app.use("/api", require("./routes/hireRoutes"));
// app.use("/api/admin", require("./routes/adminHireRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// app.get("/", (req, res) => {
//   res.send("API Working ✅");
// });

// // Weekly cron job (same)
// cron.schedule("0 9 * * 1", async () => {
//   console.log("Running weekly fresher opportunities email job...");
//   const FresherOpportunity = require("./models/FresherOpportunity");
//   const oneWeekAgo = new Date();
//   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//   const recentOpportunities = await FresherOpportunity.find({
//     createdAt: { $gte: oneWeekAgo },
//   });

//   const {
//     sendEmailToUsers,
//   } = require("./controllers/fresherOpportunityController");
//   for (const opp of recentOpportunities) {
//     await sendEmailToUsers(opp);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server Running at http://localhost:${PORT}`);
// });

// 03/11/2025
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// ✅ CORS FIX for Netlify (frontend) → Render (backend)
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL, // e.g. https://ashish-portfolio.netlify.app
      "http://localhost:3000", // CRA local
      "http://localhost:5173", // optional for local
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🧠 Debug log middleware
app.use((req, res, next) => {
  console.log("---- Incoming Request ----");
  console.log("Path:", req.path);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Cookies:", req.cookies);
  console.log("--------------------------");
  next();
});

// 🧩 Force HTTPS cookie (important for Render)
app.set("trust proxy", 1); // 👈 add this line

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/home/skills", require("./routes/skillsRoutes"));
app.use("/api/vision", require("./routes/visionRoutes"));
app.use("/api/home/pageA", require("./routes/pageARoutes"));
app.use("/api/home/pageB", require("./routes/pageBRoutes"));
app.use("/api/home/pageC", require("./routes/pageCRoutes"));
app.use("/api/home/pageD", require("./routes/pageDRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use(
  "/api/fresher-opportunities",
  require("./routes/fresherOpportunityRoutes")
);
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/journey", require("./routes/journeyRoutes"));
app.use("/api/assistant", require("./routes/assistantRoutes"));
app.use("/api", require("./routes/hireRoutes"));
app.use("/api/admin", require("./routes/adminHireRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// 🕒 Weekly cron job (same)
cron.schedule("0 9 * * 1", async () => {
  console.log("Running weekly fresher opportunities email job...");
  const FresherOpportunity = require("./models/FresherOpportunity");
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentOpportunities = await FresherOpportunity.find({
    createdAt: { $gte: oneWeekAgo },
  });

  const {
    sendEmailToUsers,
  } = require("./controllers/fresherOpportunityController");
  for (const opp of recentOpportunities) {
    await sendEmailToUsers(opp);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server Running at http://localhost:${PORT}`);
});

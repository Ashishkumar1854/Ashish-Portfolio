// const express = require("express");
// const router = express.Router();
// const { getPageB, savePageB } = require("../controllers/pageBController");

// router.get("/", getPageB);
// router.post("/", savePageB);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const { getPageB, savePageB } = require("../controllers/pageBController");

// // Multer Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // make sure "uploads" folder exists
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });

// // ✅ Routes
// router.get("/", getPageB);
// router.post("/", upload.single("pdf"), savePageB); // <== Accept file
// // Optional delete route if needed
// router.delete("/", async (req, res) => {
//   try {
//     const pageB = await require("../models/Home").findOne({ section: "pageB" });
//     if (pageB) {
//       await pageB.deleteOne();
//       res.json({ success: true });
//     } else {
//       res.status(404).json({ success: false, message: "Page B not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getPageB, savePageB } = require("../controllers/pageBController");

router.get("/", getPageB);
router.post("/", savePageB); // ❌ no multer needed

module.exports = router;

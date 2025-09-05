// // 31/08
// //authRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   getAbout,
//   addTeamMember,
//   deleteTeamMember,
//   addService,
//   deleteService,
//   addContact,
//   deleteContact,
// } = require("../controllers/aboutController");

// const { protect, adminAuth } = require("../middleware/authMiddleware");

// // Public
// router.get("/", getAbout);

// // Admin only
// router.post("/team", protect, adminAuth, addTeamMember);
// router.delete("/team/:id", protect, adminAuth, deleteTeamMember);

// router.post("/service", protect, adminAuth, addService);
// router.delete("/service/:id", protect, adminAuth, deleteService);

// router.post("/contact", protect, adminAuth, addContact);
// router.delete("/contact/:id", protect, adminAuth, deleteContact);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getAbout,
//   addTeamMember,
//   deleteTeamMember,
//   addService,
//   deleteService,
//   addContact,
//   deleteContact,
// } = require("../controllers/aboutController");

// const { protect, adminAuth } = require("../middleware/authMiddleware");

// // Public: Anyone can view
// router.get("/", getAbout);

// // Admin only: Manage content
// router.post("/team", protect, adminAuth, addTeamMember);
// router.delete("/team/:id", protect, adminAuth, deleteTeamMember);

// router.post("/service", protect, adminAuth, addService);
// router.delete("/service/:id", protect, adminAuth, deleteService);

// router.post("/contact", protect, adminAuth, addContact);
// router.delete("/contact/:id", protect, adminAuth, deleteContact);

// module.exports = router;

//05/09

const express = require("express");
const router = express.Router();
const {
  getAbout,
  addTeamMember,
  deleteTeamMember,
  addService,
  deleteService,
  addContact,
  deleteContact,
} = require("../controllers/aboutController");

const { protect, adminAuth } = require("../middleware/authMiddleware");

// Public
router.get("/", getAbout);

// Admin only
router.post("/team", protect, adminAuth, addTeamMember);
router.delete("/team/:id", protect, adminAuth, deleteTeamMember);

router.post("/service", protect, adminAuth, addService);
router.delete("/service/:id", protect, adminAuth, deleteService);

router.post("/contact", protect, adminAuth, addContact);
router.delete("/contact/:id", protect, adminAuth, deleteContact);

module.exports = router;

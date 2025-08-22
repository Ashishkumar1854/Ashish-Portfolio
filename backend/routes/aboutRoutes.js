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
// const { adminAuth } = require("../middleware/authMiddleware");

// // Public
// router.get("/", getAbout);

// // Admin
// router.post("/team", adminAuth, addTeamMember);
// router.delete("/team/:id", adminAuth, deleteTeamMember);

// router.post("/service", adminAuth, addService);
// router.delete("/service/:id", adminAuth, deleteService);

// router.post("/contact", adminAuth, addContact);
// router.delete("/contact/:id", adminAuth, deleteContact);

// module.exports = router;

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
const { adminAuth } = require("../middleware/authMiddleware");

// Public
router.get("/", getAbout);

// Admin only
router.post("/team", adminAuth, addTeamMember);
router.delete("/team/:id", adminAuth, deleteTeamMember);

router.post("/service", adminAuth, addService);
router.delete("/service/:id", adminAuth, deleteService);

router.post("/contact", adminAuth, addContact);
router.delete("/contact/:id", adminAuth, deleteContact);

module.exports = router;

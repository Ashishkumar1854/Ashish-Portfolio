// const express = require("express");
// const router = express.Router();
// const {
//   getPageC,
//   savePageC,
//   // deletePageC,
// } = require("../controllers/pageCController");

// router.get("/", getPageC);
// router.post("/", savePageC);
// // router.delete("/:id", deletePageC); // ✅ Add this

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getPageC,
  savePageC,
  deleteTestimonial,
} = require("../controllers/pageCController");

router.get("/", getPageC);
router.post("/", savePageC);
router.delete("/:index", deleteTestimonial); // ✅ delete by index in array

module.exports = router;

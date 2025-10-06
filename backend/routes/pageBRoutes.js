// const express = require("express");
// const router = express.Router();
// const { getPageB, savePageB } = require("../controllers/pageBController");

// router.get("/", getPageB);
// router.post("/", savePageB); // ❌ no multer needed

// module.exports = router;

//6oct
const express = require("express");
const router = express.Router();
const {
  getPageB,
  savePageB,
  deletePageBItem,
} = require("../controllers/pageBController");

router.get("/", getPageB);
router.post("/", savePageB);
router.delete("/:index", deletePageBItem); // delete specific item

module.exports = router;

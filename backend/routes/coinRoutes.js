const express = require("express");
const router = express.Router();
const {
  addTimeCoins,
  addActionCoins,
  getUserCoins,
} = require("../controllers/coinController");
const { protect } = require("../middleware/authMiddleware"); // 👈 yaha fix

router.post("/addTime", protect, addTimeCoins);
router.post("/action", protect, addActionCoins);
router.get("/me", protect, getUserCoins);

module.exports = router;

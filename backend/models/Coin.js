const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coins: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  dailyStreak: { type: Number, default: 0 },
});

module.exports = mongoose.model("Coin", coinSchema);

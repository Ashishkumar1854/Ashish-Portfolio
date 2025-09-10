//📁 backend/controllers/streakController.js
const Coin = require("../models/Coin");

// ✅ Daily streak handler
exports.handleDailyStreak = async (userId) => {
  const today = new Date().toDateString();

  let coinDoc = await Coin.findOne({ user: userId });
  if (!coinDoc) {
    coinDoc = await Coin.create({
      user: userId,
      coins: 3,
      dailyStreak: 1,
      lastLogin: today,
    });
    return;
  }

  if (coinDoc.lastLogin !== today) {
    coinDoc.coins += 3;
    coinDoc.dailyStreak += 1;
    coinDoc.lastLogin = today;
    await coinDoc.save();
  }
};

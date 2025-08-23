const Coin = require("../models/Coin");

// Add coins based on time spent
exports.addTimeCoins = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { seconds } = req.body;
    const userId = req.user._id;

    let coinDoc = await Coin.findOne({ userId });
    if (!coinDoc) coinDoc = new Coin({ userId, coins: 0 });

    const coinsEarned = Math.floor(seconds / 300); // 1 coin per 5 mins
    coinDoc.coins += coinsEarned;
    coinDoc.lastActive = new Date();

    await coinDoc.save();
    res.json({ coins: coinDoc.coins });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add coins based on action (like, comment, feedback)
exports.addActionCoins = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { action } = req.body;
    const userId = req.user._id;

    let coinDoc = await Coin.findOne({ userId });
    if (!coinDoc) coinDoc = new Coin({ userId, coins: 0 });

    const values = { like: 1, comment: 3, feedback: 5 };
    coinDoc.coins += values[action] || 0;
    coinDoc.lastActive = new Date();

    await coinDoc.save();
    res.json({ coins: coinDoc.coins });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get logged-in user's coins
exports.getUserCoins = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.user._id;
    let coinDoc = await Coin.findOne({ userId });

    if (!coinDoc) {
      coinDoc = new Coin({ userId, coins: 0 });
      await coinDoc.save();
    }

    res.json({ coins: coinDoc.coins });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

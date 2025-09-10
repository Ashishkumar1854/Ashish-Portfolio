//📁 backend/controllers/shareController.js

const Share = require("../models/Share");
const Coin = require("../models/Coin");

// ✅ Share Blog
exports.shareBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    await Share.create({ blog: blogId, user: req.user._id });

    await Coin.updateOne(
      { user: req.user._id },
      { $inc: { coins: 3 } },
      { upsert: true }
    );
    res.json({ message: "Blog shared" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sharing blog", error: error.message });
  }
};

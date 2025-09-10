//📁 backend/controllers/likeController.js
const Like = require("../models/Like");
const Coin = require("../models/Coin");

// ✅ Toggle Like
exports.toggleLike = async (req, res) => {
  try {
    const { blogId } = req.body;
    const existing = await Like.findOne({ blog: blogId, user: req.user._id });

    if (existing) {
      await existing.deleteOne();
      await Coin.updateOne({ user: req.user._id }, { $inc: { coins: -2 } });
      return res.json({ message: "Like removed" });
    }

    await Like.create({ blog: blogId, user: req.user._id });
    await Coin.updateOne(
      { user: req.user._id },
      { $inc: { coins: 2 } },
      { upsert: true }
    );
    res.json({ message: "Liked" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling like", error: error.message });
  }
};

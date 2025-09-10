//📁 backend/controllers/commentController.js
const Comment = require("../models/Comment");
const Coin = require("../models/Coin");

// ✅ Add Comment
exports.addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;
    const comment = await Comment.create({
      blog: blogId,
      user: req.user._id,
      text,
    });

    // Coins +4
    await Coin.updateOne(
      { user: req.user._id },
      { $inc: { coins: 4 } },
      { upsert: true }
    );

    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

// ✅ Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your comment" });

    await comment.deleteOne();

    // Remove points -4
    await Coin.updateOne({ user: req.user._id }, { $inc: { coins: -4 } });

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

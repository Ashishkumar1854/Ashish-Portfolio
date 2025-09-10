const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    change: { type: Number, required: true },
    reason: {
      type: String,
      enum: [
        "LIKE",
        "UNLIKE",
        "COMMENT",
        "COMMENT_DELETE",
        "SHARE",
        "UNSHARE",
        "STREAK",
      ],
      required: true,
    },
    refPost: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coin", coinSchema);

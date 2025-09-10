const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

likeSchema.index({ post: 1, user: 1 }, { unique: true }); // one like per user
module.exports = mongoose.model("Like", likeSchema);

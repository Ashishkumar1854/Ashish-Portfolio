const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

shareSchema.index({ post: 1, user: 1 }, { unique: true });
module.exports = mongoose.model("Share", shareSchema);

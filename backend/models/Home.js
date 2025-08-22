//

//15august
const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: [
        "recentPost",
        "hero",
        "skill",
        "vision",
        "pageA",
        "pageB",
        "pageC",
        "pageD",
      ],
    },
    content: {
      type: mongoose.Schema.Types.Mixed, // Allows flexibility (Array, Object, String)
      required: true,
    },
  },
  { timestamps: true }
); // timestamps add so har record me createdAt / updatedAt aa jaye

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Home || mongoose.model("Home", homeSchema);

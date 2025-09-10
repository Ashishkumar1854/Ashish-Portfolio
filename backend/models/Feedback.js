// backend/models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number, min: 0, max: 5, default: 0 }, // 0..5, default 0
  category: {
    type: String,
    enum: ["Website", "Service", "Product", "Other", "General"],
    default: "General",
  },
  message: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);

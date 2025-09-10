// 1️⃣ backend/models/Journey.js
const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journey", journeySchema);

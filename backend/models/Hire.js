//models/Hire.js

const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projectType: { type: String, required: true },
    budget: { type: String, required: true },
    description: { type: String, required: true },
    documentUrl: { type: String }, // Cloudinary link
    status: { type: String, default: "pending" }, // pending → confirmed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hire", hireSchema);

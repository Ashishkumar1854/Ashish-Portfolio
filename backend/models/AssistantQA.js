//backend/models/AssistantQA.js
const mongoose = require("mongoose");

const assistantQASchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "general" },
    createdBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssistantQA", assistantQASchema);

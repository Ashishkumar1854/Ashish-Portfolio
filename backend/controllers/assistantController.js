// backend/controllers/assistantController.js
const AssistantQA = require("../models/AssistantQA");

// Get all Q&A
exports.getAllQA = async (req, res) => {
  try {
    const qaList = await AssistantQA.find().sort({ createdAt: -1 });
    res.json(qaList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Q&A", error: error.message });
  }
};

// Add new Q&A
exports.addQA = async (req, res) => {
  try {
    const { question, answer, category, createdBy } = req.body;
    if (!question || !answer)
      return res.status(400).json({ message: "Question and Answer required" });
    const newQA = new AssistantQA({ question, answer, category, createdBy });
    await newQA.save();
    res.status(201).json(newQA);
  } catch (error) {
    res.status(500).json({ message: "Error adding Q&A", error: error.message });
  }
};

// Update Q&A
exports.updateQA = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await AssistantQA.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Q&A", error: error.message });
  }
};

// Delete Q&A
exports.deleteQA = async (req, res) => {
  try {
    const { id } = req.params;
    await AssistantQA.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Q&A", error: error.message });
  }
};

// 1.2 controllers/journeyController.js
const Journey = require("../models/Journey");

// ✅ Get all journeys
exports.getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().sort({ year: 1 });
    res.json(journeys);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch journeys", error: err.message });
  }
};

// ✅ Create new journey (Admin only)
exports.createJourney = async (req, res) => {
  try {
    const { year, title, description } = req.body;
    const newJourney = await Journey.create({ year, title, description });
    res.status(201).json(newJourney);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create journey", error: err.message });
  }
};

// ✅ Update journey by ID (Admin only)
exports.updateJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, description } = req.body;

    const updated = await Journey.findByIdAndUpdate(
      id,
      { year, title, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Journey not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update journey", error: err.message });
  }
};

// ✅ Delete journey by ID (Admin only)
exports.deleteJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Journey.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Journey not found" });
    res.json({ message: "Journey deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete journey", error: err.message });
  }
};

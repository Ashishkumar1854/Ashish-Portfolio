import FresherOpportunity from "../models/FresherOpportunity.js";

// Add new opportunity
export const createOpportunity = async (req, res) => {
  try {
    const opportunity = new FresherOpportunity(req.body);
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all opportunities
export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await FresherOpportunity.find().sort({
      createdAt: -1,
    });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteOpportunity = async (req, res) => {
  try {
    await FresherOpportunity.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

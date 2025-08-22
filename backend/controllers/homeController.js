// controllers/homeController.js
const Home = require("../models/Home");

// ✅ GET Section
exports.getSection = async (req, res) => {
  try {
    const section = req.params.section;
    const data = await Home.findOne({ section });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch Failed" });
  }
};

// ✅ POST Section (Upsert)
exports.saveSection = async (req, res) => {
  try {
    const { section, content } = req.body;
    const updated = await Home.findOneAndUpdate(
      { section },
      { content },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: "Save Failed" });
  }
};

// ✅ DELETE Section
exports.deleteSection = async (req, res) => {
  try {
    await Home.findOneAndDelete({ section: req.params.section });
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Delete Failed" });
  }
};

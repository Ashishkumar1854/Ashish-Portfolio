const Home = require("../models/Home");

exports.getVision = async (req, res) => {
  try {
    const section = await Home.findOne({ section: "vision" });
    res.json({ success: true, data: section });
  } catch (err) {
    console.error("Get Vision Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateVision = async (req, res) => {
  try {
    const { content } = req.body;
    const updated = await Home.findOneAndUpdate(
      { section: "vision" },
      { content },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update Vision Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

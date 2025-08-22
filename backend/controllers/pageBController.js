const Home = require("../models/Home");

// GET /pageB
exports.getPageB = async (req, res) => {
  try {
    const pageB = await Home.findOne({ section: "pageB" });
    res.json({ success: true, data: pageB });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /pageB
exports.savePageB = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    const content = {
      title,
      description,
      link, // ✅ Only a simple link
    };

    let pageB = await Home.findOne({ section: "pageB" });

    if (pageB) {
      pageB.content = content;
      await pageB.save();
    } else {
      pageB = await Home.create({ section: "pageB", content });
    }

    res.json({ success: true, data: pageB });
  } catch (err) {
    console.error("Error in savePageB:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

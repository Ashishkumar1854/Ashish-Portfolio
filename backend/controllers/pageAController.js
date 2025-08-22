const Home = require("../models/Home");

exports.getPageA = async (req, res) => {
  try {
    const pageA = await Home.findOne({ section: "pageA" });
    res.json({ success: true, data: pageA });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.savePageA = async (req, res) => {
  try {
    const { content } = req.body;
    let pageA = await Home.findOne({ section: "pageA" });

    if (pageA) {
      pageA.content = content;
      await pageA.save();
    } else {
      pageA = await Home.create({ section: "pageA", content });
    }

    res.json({ success: true, data: pageA });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

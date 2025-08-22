const Home = require("../models/Home");

exports.getPageD = async (req, res) => {
  try {
    const pageD = await Home.findOne({ section: "pageD" });
    res.json({ success: true, data: pageC });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.savePageD = async (req, res) => {
  try {
    const { content } = req.body;
    let pageD = await Home.findOne({ section: "pageD" });

    if (pageD) {
      pageD.content = content;
      await pageC.save();
    } else {
      pageD = await Home.create({ section: "pageD", content });
    }

    res.json({ success: true, data: pageD });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

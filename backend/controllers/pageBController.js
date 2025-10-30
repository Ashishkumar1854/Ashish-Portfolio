// const Home = require("../models/Home");

// // GET /pageB
// exports.getPageB = async (req, res) => {
//   try {
//     const pageB = await Home.findOne({ section: "pageB" });
//     res.json({ success: true, data: pageB });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // POST /pageB
// exports.savePageB = async (req, res) => {
//   try {
//     const { title, description, link } = req.body;

//     const content = {
//       title,
//       description,
//       link, // ✅ Only a simple link
//     };

//     let pageB = await Home.findOne({ section: "pageB" });

//     if (pageB) {
//       pageB.content = content;
//       await pageB.save();
//     } else {
//       pageB = await Home.create({ section: "pageB", content });
//     }

//     res.json({ success: true, data: pageB });
//   } catch (err) {
//     console.error("Error in savePageB:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // 06 october login add multiple startup

// const Home = require("../models/Home");

// // GET /pageB
// exports.getPageB = async (req, res) => {
//   try {
//     const pageB = await Home.findOne({ section: "pageB" });
//     res.json({ success: true, data: pageB });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // POST /pageB
// exports.savePageB = async (req, res) => {
//   try {
//     const { title, description, link } = req.body;

//     const newContent = { title, description, link };

//     let pageB = await Home.findOne({ section: "pageB" });

//     if (pageB) {
//       // ✅ push new content into array
//       if (!Array.isArray(pageB.content)) {
//         pageB.content = [pageB.content]; // convert old single object to array
//       }
//       pageB.content.push(newContent);
//       await pageB.save();
//     } else {
//       pageB = await Home.create({ section: "pageB", content: [newContent] });
//     }

//     res.json({ success: true, data: pageB });
//   } catch (err) {
//     console.error("Error in savePageB:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // DELETE /pageB/:index
// exports.deletePageBItem = async (req, res) => {
//   try {
//     const { index } = req.params;
//     let pageB = await Home.findOne({ section: "pageB" });

//     if (!pageB || !Array.isArray(pageB.content)) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No content found" });
//     }

//     pageB.content.splice(index, 1); // remove specific startup
//     await pageB.save();

//     res.json({ success: true, data: pageB });
//   } catch (err) {
//     console.error("Delete Error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

/////30/10

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
    const newContent = { title, description, link };

    let pageB = await Home.findOne({ section: "pageB" });

    if (pageB) {
      if (!Array.isArray(pageB.content)) pageB.content = [pageB.content];
      pageB.content.push(newContent);
      await pageB.save();
    } else {
      pageB = await Home.create({ section: "pageB", content: [newContent] });
    }

    res.json({ success: true, data: pageB });
  } catch (err) {
    console.error("Error in savePageB:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE /pageB/:index
exports.deletePageBItem = async (req, res) => {
  try {
    const { index } = req.params;
    const pageB = await Home.findOne({ section: "pageB" });

    if (!pageB || !Array.isArray(pageB.content)) {
      return res
        .status(404)
        .json({ success: false, message: "No content found" });
    }

    // ✅ small fix: avoid invalid index crash
    if (index < 0 || index >= pageB.content.length) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    pageB.content.splice(index, 1);
    await pageB.save();

    res.json({ success: true, data: pageB });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

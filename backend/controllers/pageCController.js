// const Home = require("../models/Home");

// // GET pageC data
// exports.getPageC = async (req, res) => {
//   try {
//     const data = await Home.findOne({ section: "pageC" });
//     res.status(200).json({ success: true, data });
//   } catch (err) {
//     console.error("Error fetching pageC:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // SAVE/UPDATE pageC data
// exports.savePageC = async (req, res) => {
//   try {
//     const { projectName, feedback, rating, description } = req.body;

//     const content = {
//       projectName,
//       feedback,
//       rating,
//       description,
//     };

//     let pageC = await Home.findOne({ section: "pageC" });

//     if (pageC) {
//       pageC.content = content;
//       await pageC.save();
//     } else {
//       pageC = await Home.create({ section: "pageC", content });
//     }

//     res.status(200).json({ success: true, data: pageC });
//   } catch (err) {
//     console.error("Error saving pageC:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// controllers/pageCController.js
const Home = require("../models/Home");

// GET testimonials
exports.getPageC = async (req, res) => {
  try {
    const data = await Home.findOne({ section: "pageC" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error fetching pageC:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADD testimonial (push into content array)
exports.savePageC = async (req, res) => {
  try {
    const { projectName, feedback, rating, description } = req.body;
    const newTestimonial = { projectName, feedback, rating, description };

    let pageC = await Home.findOne({ section: "pageC" });

    if (pageC) {
      pageC.content.push(newTestimonial); // ⬅️ Push new one
      await pageC.save();
    } else {
      pageC = await Home.create({
        section: "pageC",
        content: [newTestimonial],
      });
    }

    res.status(200).json({ success: true, data: pageC });
  } catch (err) {
    console.error("Error saving pageC:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE testimonial (admin only)
exports.deleteTestimonial = async (req, res) => {
  try {
    const { index } = req.params;

    const pageC = await Home.findOne({ section: "pageC" });
    if (!pageC)
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });

    pageC.content.splice(index, 1);
    await pageC.save();

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete testimonial error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

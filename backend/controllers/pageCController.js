// // controllers/pageCController.js
// const Home = require("../models/Home");

// // GET testimonials
// exports.getPageC = async (req, res) => {
//   try {
//     const data = await Home.findOne({ section: "pageC" });
//     res.status(200).json({ success: true, data });
//   } catch (err) {
//     console.error("Error fetching pageC:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ADD testimonial (push into content array)
// exports.savePageC = async (req, res) => {
//   try {
//     const { projectName, feedback, rating, description } = req.body;
//     const newTestimonial = { projectName, feedback, rating, description };

//     let pageC = await Home.findOne({ section: "pageC" });

//     if (pageC) {
//       pageC.content.push(newTestimonial); // ⬅️ Push new one
//       await pageC.save();
//     } else {
//       pageC = await Home.create({
//         section: "pageC",
//         content: [newTestimonial],
//       });
//     }

//     res.status(200).json({ success: true, data: pageC });
//   } catch (err) {
//     console.error("Error saving pageC:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // DELETE testimonial (admin only)
// exports.deleteTestimonial = async (req, res) => {
//   try {
//     const { index } = req.params;

//     const pageC = await Home.findOne({ section: "pageC" });
//     if (!pageC)
//       return res
//         .status(404)
//         .json({ success: false, message: "Data not found" });

//     pageC.content.splice(index, 1);
//     await pageC.save();

//     res.status(200).json({ success: true, message: "Deleted" });
//   } catch (err) {
//     console.error("Delete testimonial error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// controllers/pageCController.js
const Home = require("../models/Home");

// GET /pageC - fetch testimonials
exports.getPageC = async (req, res) => {
  try {
    console.log("🔹 GET /pageC called");
    const pageC = await Home.findOne({ section: "pageC" });
    console.log("🔹 Fetched pageC from DB:", pageC);
    res.status(200).json({ success: true, data: pageC });
  } catch (err) {
    console.error("❌ Error fetching pageC:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /pageC - add new testimonial
exports.savePageC = async (req, res) => {
  try {
    console.log("🔹 POST /pageC body:", req.body);

    const { projectName, feedback, rating, description } = req.body;

    // Validate required fields
    if (!projectName || !feedback || !rating) {
      return res.status(400).json({
        success: false,
        message: "Project name, feedback, and rating are required",
      });
    }

    const newTestimonial = {
      projectName,
      feedback,
      rating: Number(rating), // convert to number
      description: description || "",
    };

    console.log("🔹 Prepared newTestimonial:", newTestimonial);

    let pageC = await Home.findOne({ section: "pageC" });
    console.log("🔹 Fetched pageC from DB:", pageC);

    if (pageC) {
      pageC.content = Array.isArray(pageC.content) ? pageC.content : [];
      pageC.content.push(newTestimonial);
      const saved = await pageC.save();
      console.log("✅ Saved pageC:", saved);
    } else {
      pageC = await Home.create({
        section: "pageC",
        content: [newTestimonial],
      });
      console.log("✅ Created pageC:", pageC);
    }

    res.status(200).json({ success: true, data: pageC });
  } catch (err) {
    console.error("❌ Error saving pageC:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE /pageC/:index - delete testimonial by index
exports.deleteTestimonial = async (req, res) => {
  try {
    const { index } = req.params;
    console.log(`🔹 DELETE /pageC/${index} called`);

    const pageC = await Home.findOne({ section: "pageC" });
    console.log("🔹 Fetched pageC from DB:", pageC);

    if (!pageC || !Array.isArray(pageC.content)) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    if (index < 0 || index >= pageC.content.length) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    pageC.content.splice(index, 1); // remove specific testimonial
    const saved = await pageC.save();
    console.log("✅ Deleted testimonial, saved pageC:", saved);

    res.status(200).json({ success: true, message: "Deleted", data: pageC });
  } catch (err) {
    console.error("❌ Delete testimonial error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

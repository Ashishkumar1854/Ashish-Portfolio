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

// ✅ Utility: ensure data is always array
const ensureArray = (data) => (Array.isArray(data) ? data : data ? [data] : []);

// ✅ GET /pageC - fetch testimonials
exports.getPageC = async (req, res) => {
  try {
    console.log("🔹 [GET] /pageC");

    let pageC = await Home.findOne({ section: "pageC" });

    if (!pageC) {
      console.log("⚠️ No pageC data found, returning empty array");
      return res.status(200).json({ success: true, data: { content: [] } }); // ✅ aligned format
    }

    pageC.content = ensureArray(pageC.content);

    res.status(200).json({ success: true, data: { content: pageC.content } }); // ✅ aligned
  } catch (err) {
    console.error("❌ [GET] pageC error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ POST /pageC - add new testimonial
exports.savePageC = async (req, res) => {
  try {
    console.log("🔹 [POST] /pageC body:", req.body);

    const { projectName, feedback, rating, description } = req.body;

    // Validation
    if (!projectName || !feedback || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "Project name, feedback, and rating are required.",
      });
    }

    const newTestimonial = {
      projectName: String(projectName).trim(),
      feedback: String(feedback).trim(),
      rating: Number(rating),
      description: description ? String(description).trim() : "",
      createdAt: new Date(),
    };

    let pageC = await Home.findOne({ section: "pageC" });

    if (pageC) {
      pageC.content = ensureArray(pageC.content);
      pageC.content.push(newTestimonial);
      pageC.markModified("content"); // ✅ force mongoose to detect change
      await pageC.save();
      console.log("✅ [POST] Added new testimonial");
    } else {
      pageC = await Home.create({
        section: "pageC",
        content: [newTestimonial],
      });
      console.log("✅ [POST] Created pageC section");
    }

    res.status(200).json({ success: true, data: { content: pageC.content } }); // ✅ aligned
  } catch (err) {
    console.error("❌ [POST] pageC error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ DELETE /pageC/:index - delete testimonial safely
exports.deleteTestimonial = async (req, res) => {
  try {
    const { index } = req.params;
    console.log(`🔹 [DELETE] /pageC/${index}`);

    let pageC = await Home.findOne({ section: "pageC" });

    if (!pageC) {
      return res
        .status(404)
        .json({ success: false, message: "pageC not found" });
    }

    pageC.content = ensureArray(pageC.content);

    if (index < 0 || index >= pageC.content.length) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    const removed = pageC.content.splice(index, 1);
    pageC.markModified("content"); // ✅ ensure deletion is saved
    await pageC.save();

    console.log("✅ [DELETE] Removed testimonial:", removed);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: { content: pageC.content }, // ✅ aligned
    });
  } catch (err) {
    console.error("❌ [DELETE] pageC error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

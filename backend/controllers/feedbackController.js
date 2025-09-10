// backend/controllers/feedbackController.js
const Feedback = require("../models/Feedback");

// Create Feedback (Public)
exports.createFeedback = async (req, res) => {
  try {
    const { name, rating, category, message, isAnonymous } = req.body;

    if (!message || String(message).trim().length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    let numericRating = Number(rating);
    if (Number.isNaN(numericRating)) numericRating = 0;
    numericRating = Math.max(0, Math.min(5, numericRating)); // clamp

    const feedbackData = {
      name: isAnonymous === "true" || isAnonymous === true ? "Anonymous" : name,
      rating: numericRating,
      category: category || "General",
      message,
      isAnonymous: isAnonymous === "true" || isAnonymous === true,
    };

    const saved = await Feedback.create(feedbackData);

    return res.status(201).json({ success: true, feedback: saved });
  } catch (error) {
    console.error("createFeedback error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Feedbacks with Pagination + Filters
exports.getFeedbacks = async (req, res) => {
  try {
    const { category, minRating, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const skip = (Number(page) - 1) * Number(limit);

    const [feedbacks, total] = await Promise.all([
      Feedback.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Feedback.countDocuments(filter),
    ]);

    res.json({
      success: true,
      feedbacks,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      hasMore: Number(page) * Number(limit) < total,
    });
  } catch (error) {
    console.error("getFeedbacks error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Feedback (Admin only)
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const fb = await Feedback.findById(id);
    if (!fb)
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });

    await fb.deleteOne();
    return res.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    console.error("deleteFeedback error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

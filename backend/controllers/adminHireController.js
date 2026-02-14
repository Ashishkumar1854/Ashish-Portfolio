//controllers/adminHireController.js

const Hire = require("../models/Hire");
const sendEmail = require("../utils/sendEmail");

// ✅ Get all pending hire requests
exports.getPendingHires = async (req, res) => {
  try {
    const hires = await Hire.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    res.json(hires);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch hires", error: err.message });
  }
};

// ✅ Confirm hire request
exports.confirmHire = async (req, res) => {
  try {
    const hireId = req.params.id;
    const { budget, timeToComplete, contactNumber, notes } = req.body;

    const hire = await Hire.findById(hireId);
    if (!hire) return res.status(404).json({ message: "Hire not found" });

    hire.status = "confirmed";
    hire.budget = budget;
    hire.timeToComplete = timeToComplete;
    hire.contactNumber = contactNumber;
    hire.notes = notes;
    await hire.save();

    // ✅ Send email to user
    await sendEmail(
      hire.email,
      "✅ Your Hire Request is Confirmed",
      `
      <p>Hi ${hire.name},</p>
      <p>Good news! Your hire request for <strong>${hire.projectType}</strong> has been reviewed and <strong>confirmed</strong> by our admin team.</p>
      <ul>
        <li><b>Budget:</b> ${budget}</li>
        <li><b>Estimated Time to Complete:</b> ${timeToComplete}</li>
        <li><b>Contact:</b> ${contactNumber}</li>
      </ul>
      <p>Additional Notes/Suggestions from Admin:</p>
      <p>${notes}</p>
      <p>You can view your uploaded document here: <a href="${hire.documentUrl}" target="_blank">View PDF</a></p>
      <p>Regards,<br/>Ashish Bhai Team</p>
      `
    );

    res.json({ message: "Hire confirmed and user notified", hire });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to confirm hire", error: err.message });
  }
};

// ✅ Quick verify (no extra details)
exports.verifyHire = async (req, res) => {
  try {
    const hireId = req.params.id;

    const hire = await Hire.findById(hireId);
    if (!hire) return res.status(404).json({ message: "Hire not found" });

    if (hire.status !== "confirmed") {
      hire.status = "confirmed";
      await hire.save();

      await sendEmail(
        hire.email,
        "✅ Your Hire Request is Confirmed",
        `
        <p>Hi ${hire.name},</p>
        <p>Your hire request for <strong>${hire.projectType}</strong> has been confirmed.</p>
        ${
          hire.documentUrl
            ? `<p>You can view your uploaded document here: <a href="${hire.documentUrl}" target="_blank">View File</a></p>`
            : ""
        }
        <p>Regards,<br/>Ashish Bhai Team</p>
        `
      );
    }

    res.json({ success: true, hire });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to verify hire", error: err.message });
  }
};

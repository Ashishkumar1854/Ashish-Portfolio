///......................cloudinary view pdf

const Hire = require("../models/Hire");
const { uploadAndGetPreviewLink } = require("../utils/cloudinaryHelper");
const sendEmail = require("../utils/sendEmail");

// Debug Cloudinary config (optional)
try {
  const cloudinary = require("../config/cloudinary");
  console.log("🔍 Cloudinary config in hireController:", cloudinary.config());
} catch (e) {
  console.warn("⚠️ Could not log cloudinary config:", e.message);
}

exports.createHireRequest = async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, description } = req.body;
    let documentUrl = null;

    // Upload if file exists
    if (req.file && req.file.path) {
      console.log("📂 File received for upload:", req.file.path);
      // Use helper to upload + return Cloudinary preview link
      documentUrl = await uploadAndGetPreviewLink(req.file.path);
    } else {
      console.log("⚠️ No file attached in request.");
    }

    // Save in DB
    const hire = await Hire.create({
      name,
      email,
      phone,
      projectType,
      budget,
      description,
      documentUrl,
    });

    console.log("✅ Hire saved to DB:", hire);

    // Send email to Admin (Cloudinary page link)
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "📩 New Hire Request",
      `
        <h3>New Hire Request Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Project Type:</b> ${projectType}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Description:</b> ${description}</p>
        ${
          documentUrl
            ? `<p><b>Document:</b> <a href="${documentUrl}" target="_blank" rel="noopener noreferrer">View File</a></p>`
            : "<p><i>No document uploaded</i></p>"
        }
      `
    );

    // Send confirmation email to client
    await sendEmail(
      email,
      "✅ We Received Your Hire Request",
      `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! We have received your project request.</p>
        <p>Our admin will review and get back to you shortly.</p>
        <p>Regards,<br/>Ashish Bhai Team</p>
      `
    );

    return res.status(201).json({ message: "Hire request submitted", hire });
  } catch (error) {
    console.error("❌ Hire Request Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

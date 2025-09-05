// import FresherOpportunity from "../models/FresherOpportunity.js";

// // Add new opportunity
// export const createOpportunity = async (req, res) => {
//   try {
//     const opportunity = new FresherOpportunity(req.body);
//     await opportunity.save();
//     res.status(201).json(opportunity);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all opportunities
// export const getOpportunities = async (req, res) => {
//   try {
//     const opportunities = await FresherOpportunity.find().sort({
//       createdAt: -1,
//     });
//     res.json(opportunities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete
// export const deleteOpportunity = async (req, res) => {
//   try {
//     await FresherOpportunity.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

//05/09

const FresherOpportunity = require("../models/FresherOpportunity");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// ✅ Add new opportunity (Admin only)
exports.createOpportunity = async (req, res) => {
  try {
    const opportunity = new FresherOpportunity(req.body);
    await opportunity.save();

    // 🔔 Send emails (optional: cron for weekly)
    sendEmailToUsers(opportunity);

    res.status(201).json(opportunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all opportunities (Public)
exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await FresherOpportunity.find().sort({
      createdAt: -1,
    });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete opportunity (Admin only)
exports.deleteOpportunity = async (req, res) => {
  try {
    const deleted = await FresherOpportunity.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Opportunity not found" });
    res.json({ message: "Opportunity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔔 Send email notification to all users
const sendEmailToUsers = async (opportunity) => {
  try {
    const users = await User.find({ role: "user" });
    if (!users.length) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: users.map((u) => u.email).join(","),
      subject: `New Opportunity: ${opportunity.role} at ${opportunity.company}`,
      html: `<p>New opportunity posted:</p>
             <p><strong>${opportunity.role}</strong> at <strong>${
        opportunity.company
      }</strong></p>
             <p>${opportunity.description}</p>
             <p>Stipend: ${opportunity.stipend || "Not disclosed"}</p>
             <a href="${opportunity.link}">Apply Here</a>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification emails sent successfully!");
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
};

module.exports.sendEmailToUsers = sendEmailToUsers;

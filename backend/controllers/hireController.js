// //controllers/hireController.js
// const Hire = require("../models/Hire");
// const cloudinary = require("../config/cloudinary").v2;
// const sendEmail = require("../utils/sendEmail"); // already in your project

// exports.createHireRequest = async (req, res) => {
//   try {
//     const { name, email, phone, projectType, budget, description } = req.body;
//     let documentUrl = null;

//     // ✅ Upload PDF to Cloudinary if file exists
//     if (req.file) {
//       const uploadRes = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: "raw", // important for pdf/doc
//         folder: "hire_documents",
//       });
//       documentUrl = uploadRes.secure_url;
//     }

//     // ✅ Save in MongoDB
//     const hire = await Hire.create({
//       name,
//       email,
//       phone,
//       projectType,
//       budget,
//       description,
//       documentUrl,
//     });

//     // ✅ Send email to Admin
//     await sendEmail(
//       process.env.ADMIN_EMAIL,
//       "📩 New Hire Request",
//       `
//         <h3>New Hire Request Received</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Project Type:</b> ${projectType}</p>
//         <p><b>Budget:</b> ${budget}</p>
//         <p><b>Description:</b> ${description}</p>
//         ${
//           documentUrl
//             ? `<p><b>Document:</b> <a href="${documentUrl}">View File</a></p>`
//             : ""
//         }
//       `
//     );

//     // ✅ Send confirmation email to Client
//     await sendEmail(
//       email,
//       "✅ We Received Your Hire Request",
//       `
//         <p>Hi ${name},</p>
//         <p>Thanks for reaching out! We have received your project request.</p>
//         <p>Our admin will review and get back to you shortly.</p>
//         <p>Regards,<br>Ashish Bhai Team</p>
//       `
//     );

//     res.status(201).json({ message: "Hire request submitted", hire });
//   } catch (error) {
//     console.error("❌ Hire Request Error:", error);
//     res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// };

// //05 octb
// const Hire = require("../models/Hire");
// const cloudinary = require("../config/cloudinary"); // ✅ Config file import
// const sendEmail = require("../utils/sendEmail");

// // Debugging Cloudinary config
// console.log("🔍 Cloudinary in hireController:", cloudinary.config());

// exports.createHireRequest = async (req, res) => {
//   try {
//     const { name, email, phone, projectType, budget, description } = req.body;
//     let documentUrl = null;

//     // ✅ Upload PDF/Docs to Cloudinary if file exists
//     if (req.file) {
//       console.log("📂 File received for upload:", req.file.path);

//       const uploadRes = await cloudinary.uploader.upload(req.file.path, {
//         folder: "hire_documents",
//         resource_type: "raw", // PDF/Docs ke liye RAW (not auto)
//         type: "upload", // ✅ Public upload so no 401
//       });

//       // Debugging full Cloudinary response
//       console.log("✅ Cloudinary upload success:", {
//         url: uploadRes.secure_url,
//         resource_type: uploadRes.resource_type,
//         type: uploadRes.type,
//         original_filename: uploadRes.original_filename,
//       });

//       documentUrl = uploadRes.secure_url;
//     } else {
//       console.log("⚠️ No file attached in request.");
//     }

//     // ✅ Save in MongoDB
//     const hire = await Hire.create({
//       name,
//       email,
//       phone,
//       projectType,
//       budget,
//       description,
//       documentUrl,
//     });

//     console.log("✅ Hire saved to DB:", hire);

//     // ✅ Send email to Admin
//     await sendEmail(
//       process.env.ADMIN_EMAIL,
//       "📩 New Hire Request",
//       `
//         <h3>New Hire Request Received</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Project Type:</b> ${projectType}</p>
//         <p><b>Budget:</b> ${budget}</p>
//         <p><b>Description:</b> ${description}</p>
//         ${
//           documentUrl
//             ? `<p><b>Document:</b> <a href="${documentUrl}" target="_blank">View File</a></p>`
//             : "<p><i>No document uploaded</i></p>"
//         }
//       `
//     );

//     // ✅ Send confirmation email to Client
//     await sendEmail(
//       email,
//       "✅ We Received Your Hire Request",
//       `
//         <p>Hi ${name},</p>
//         <p>Thanks for reaching out! We have received your project request.</p>
//         <p>Our admin will review and get back to you shortly.</p>
//         <p>Regards,<br>Ashish Bhai Team</p>
//       `
//     );

//     res.status(201).json({ message: "Hire request submitted", hire });
//   } catch (error) {
//     console.error("❌ Hire Request Error:", error);
//     res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// };

//06oct

// // backend/controllers/hireController.js
// const Hire = require("../models/Hire");
// const { uploadAndGetPreviewLink } = require("../utils/cloudinaryHelper");
// const sendEmail = require("../utils/sendEmail");

// // Debug: confirm cloudinary config (optional)
// try {
//   const cloudinary = require("../config/cloudinary");
//   console.log("🔍 Cloudinary config in hireController:", cloudinary.config());
// } catch (e) {
//   console.warn("⚠️ Could not log cloudinary config:", e.message);
// }

// exports.createHireRequest = async (req, res) => {
//   try {
//     const { name, email, phone, projectType, budget, description } = req.body;
//     let documentUrl = null;

//     // Upload if file exists (multer puts single file in req.file)
//     if (req.file && req.file.path) {
//       console.log("📂 File received for upload:", req.file.path);
//       // Use helper to upload + return previewable link
//       documentUrl = await uploadAndGetPreviewLink(req.file.path);
//     } else {
//       console.log("⚠️ No file attached in request.");
//     }

//     // Save in DB
//     const hire = await Hire.create({
//       name,
//       email,
//       phone,
//       projectType,
//       budget,
//       description,
//       documentUrl,
//     });

//     console.log("✅ Hire saved to DB:", hire);

//     // Send email to Admin (with previewable link)
//     await sendEmail(
//       process.env.ADMIN_EMAIL,
//       "📩 New Hire Request",
//       `
//         <h3>New Hire Request Received</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Project Type:</b> ${projectType}</p>
//         <p><b>Budget:</b> ${budget}</p>
//         <p><b>Description:</b> ${description}</p>
//         ${
//           documentUrl
//             ? `<p><b>Document:</b> <a href="${documentUrl}" target="_blank" rel="noopener noreferrer">View File</a></p>`
//             : "<p><i>No document uploaded</i></p>"
//         }
//       `
//     );

//     // Send confirmation email to Client
//     await sendEmail(
//       email,
//       "✅ We Received Your Hire Request",
//       `
//         <p>Hi ${name},</p>
//         <p>Thanks for reaching out! We have received your project request.</p>
//         <p>Our admin will review and get back to you shortly.</p>
//         <p>Regards,<br/>Ashish Bhai Team</p>
//       `
//     );

//     return res.status(201).json({ message: "Hire request submitted", hire });
//   } catch (error) {
//     console.error("❌ Hire Request Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// };

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

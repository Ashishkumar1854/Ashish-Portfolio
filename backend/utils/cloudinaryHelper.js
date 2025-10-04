// // 📅 05 Oct Updated Helper
// const cloudinary = require("../config/cloudinary");

// /**
//  * Upload file to Cloudinary as raw (PDF/DOCX etc.)
//  * and return a previewable URL (open in browser).
//  */
// async function uploadAndGetPreviewLink(filePath, folder = "hire_documents") {
//   try {
//     const uploadRes = await cloudinary.uploader.upload(filePath, {
//       folder,
//       resource_type: "raw", // ✅ required for non-image files
//       type: "upload", // ✅ ensures public upload
//     });

//     console.log("✅ Cloudinary upload success:", {
//       url: uploadRes.secure_url,
//       resource_type: uploadRes.resource_type,
//       type: uploadRes.type,
//       original_filename: uploadRes.original_filename,
//     });

//     // Return secure previewable link (force preview, not download)
//     return uploadRes.secure_url.replace(
//       "/upload/",
//       "/upload/fl_attachment:false/"
//     );
//   } catch (error) {
//     console.error("❌ Cloudinary Upload Error:", error);
//     throw new Error("File upload failed");
//   }
// }

// module.exports = { uploadAndGetPreviewLink };

// // backend/utils/cloudinaryHelper.js
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs").promises;

// async function uploadAndGetPreviewLink(filePath, folder = "hire_documents") {
//   try {
//     const uploadRes = await cloudinary.uploader.upload(filePath, {
//       folder,
//       resource_type: "raw", // keep raw for PDFs/docs
//       type: "upload",
//     });

//     console.log("✅ Cloudinary upload response (full):", uploadRes);

//     // Use secure_url directly — Cloudinary handles everything
//     const previewUrl = uploadRes.secure_url;

//     // Delete multer temp file
//     try {
//       await fs.unlink(filePath);
//       console.log("🧹 Temp file deleted:", filePath);
//     } catch (unlinkErr) {
//       console.warn("⚠️ Could not delete temp file:", unlinkErr.message);
//     }

//     console.log("🔗 Preview URL:", previewUrl);
//     return previewUrl;
//   } catch (err) {
//     console.error("❌ Cloudinary Upload Error:", err);
//     throw err;
//   }
// }

// module.exports = { uploadAndGetPreviewLink };
// //

//.........................clodinary view ke lie

const cloudinary = require("../config/cloudinary");
const fs = require("fs").promises;

async function uploadAndGetPreviewLink(filePath, folder = "hire_documents") {
  try {
    const uploadRes = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "raw", // keep PDFs/docs as raw
      type: "upload",
    });

    console.log("✅ Cloudinary upload response (full):", uploadRes);

    // Option 1: Direct secure URL (default Cloudinary preview)
    const previewUrl = uploadRes.secure_url;

    // Option 2: Cloudinary Console page for inline preview
    // const previewUrl = `https://cloudinary.com/console/media_library/folders/${folder}/${uploadRes.public_id}`;

    // Delete multer temp file
    try {
      await fs.unlink(filePath);
      console.log("🧹 Temp file deleted:", filePath);
    } catch (unlinkErr) {
      console.warn("⚠️ Could not delete temp file:", unlinkErr.message);
    }

    console.log("🔗 Preview URL:", previewUrl);
    return previewUrl;
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    throw err;
  }
}

module.exports = { uploadAndGetPreviewLink };

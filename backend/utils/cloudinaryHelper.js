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

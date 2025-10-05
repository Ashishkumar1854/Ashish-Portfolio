//models/Blog.js

const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String, required: true },
    image: { type: String },
    author: { type: String, default: "Admin" },
    slug: { type: String, unique: true, index: true }, // 🔹 Added for uniqueness
  },
  { timestamps: true }
);

// 🔹 Pre-save hook to generate unique slug
blogSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let slug = slugify(this.title, { lower: true, strict: true });
  let count = 0;

  // Ensure uniqueness
  while (await mongoose.models.Blog.findOne({ slug })) {
    count++;
    slug = slugify(this.title, { lower: true, strict: true }) + `-${count}`;
  }

  this.slug = slug;
  next();
});

module.exports = mongoose.model("Blog", blogSchema);

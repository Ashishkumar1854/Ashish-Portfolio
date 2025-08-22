// 📦 Import Mongoose and Bcrypt for password hashing
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 🧠 Define User Schema with fields and validation
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  // ❌ Removed emailToken and isVerified fields
  // ✅ Add these missing fields
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
});

// 🔐 Pre-save Hook → Runs before saving user to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔁 Custom Method to Compare Passwords during Login
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// 📤 Export User model to use across backend
module.exports = mongoose.model("User", userSchema);

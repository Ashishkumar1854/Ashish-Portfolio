// 📦 Import Mongoose and Bcrypt for password hashing
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 🧠 Define User Schema with fields and validation
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true, minlength: 6 },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // ✅ For password reset
    resetToken: { type: String },
    resetTokenExpires: { type: Date },

    // ✅ For gamification
    coins: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date },
  },
  { timestamps: true }
);

// 🔐 Pre-save Hook → Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔁 Custom Method to Compare Passwords during Login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// 📤 Export User model
module.exports = mongoose.model("User", userSchema);

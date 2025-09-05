// const mongoose = require("mongoose");

// const teamSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   role: { type: String, required: true },
//   bio: { type: String },
//   image: { type: String },
//   socials: {
//     linkedin: String,
//     github: String,
//     twitter: String,
//     instagram: String,
//   },
// });

// const serviceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
// });

// const contactSchema = new mongoose.Schema({
//   type: { type: String, required: true }, // phone, email, linkedin, etc.
//   value: { type: String, required: true },
// });

// const aboutSchema = new mongoose.Schema(
//   {
//     teams: [teamSchema],
//     services: [serviceSchema],
//     contacts: [contactSchema],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("About", aboutSchema);

const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  socials: {
    linkedin: String,
    github: String,
    twitter: String,
    instagram: String,
  },
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const contactSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const aboutSchema = new mongoose.Schema(
  {
    teams: [teamSchema],
    services: [serviceSchema],
    contacts: [contactSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);

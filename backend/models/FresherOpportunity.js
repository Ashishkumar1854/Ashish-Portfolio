// import mongoose from "mongoose";

// const fresherOpportunitySchema = new mongoose.Schema(
//   {
//     role: { type: String, required: true },
//     company: { type: String, required: true },
//     description: { type: String },
//     stipend: { type: String },
//     link: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("FresherOpportunity", fresherOpportunitySchema);

//05/09

const mongoose = require("mongoose");

const fresherOpportunitySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    stipend: { type: String },
    description: { type: String },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FresherOpportunity", fresherOpportunitySchema);

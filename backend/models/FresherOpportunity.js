import mongoose from "mongoose";

const fresherOpportunitySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
    stipend: { type: String },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("FresherOpportunity", fresherOpportunitySchema);

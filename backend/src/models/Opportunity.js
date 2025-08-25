import mongoose from "mongoose";
const opportunitySchema = new mongoose.Schema(
  {
    accountId: { type: String, required: true },
    Company: { type: String, default: "" },
    opportunityName: { type: String, default: "" },
    source: { type: String, default: "" },
    ExpectedRevenue: { type: String, default: 0 },
    closeDate: { type: String, default: "" },
    stage: { type: String, default: "" },
    status: { type: String, default: "" },
  },
  { timestamps: true }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);
export default Opportunity;

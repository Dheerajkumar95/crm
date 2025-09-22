import mongoose from "mongoose";
const opportunitySchema = new mongoose.Schema(
  {
    accountId: { type: String, required: true },
    Company: { type: String, default: "" },
    OpportunityName: { type: String, default: "" },
    Source: { type: String, default: "" },
    PotentialRevenue: { type: String, default: 0 },
    closeDate: { type: String, default: "" },
    Stage: { type: String, default: "" },
    Status: { type: String, default: "" },
  },
  { timestamps: true }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);
export default Opportunity;

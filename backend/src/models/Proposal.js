// models/Proposal.js
import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
    products: Array,
    company: Object,
    client: Object,
    totalAmount: Number,
    status: { type: String, default: "Pending" },
    signature: String, // Base64 Image
    ipAddress: String, // Client IP
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);

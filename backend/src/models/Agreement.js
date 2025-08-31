import mongoose from "mongoose";

const AgreementSchema = new mongoose.Schema(
  {
    proposalId: { type: mongoose.Schema.Types.ObjectId, ref: "Proposal" },
    opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    companyDetails: Object,
    products: Array,
    status: { type: String, enum: ["Draft", "Signed"], default: "Draft" },
  },
  { timestamps: true }
);

export default mongoose.model("Agreement", AgreementSchema);

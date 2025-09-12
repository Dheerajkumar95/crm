import mongoose from "mongoose";
const agreementSchema = new mongoose.Schema(
  {
    agreementId: { type: String, required: true, unique: true },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
    },
    to: { type: String, required: true },
    date: { type: Date, default: Date.now },
    grandTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Draft", "Accepted", "Rejected"],
      default: "Draft",
    },
    vendorSignature: { type: String, default: null },
    clientSignature: { type: String, default: null },
    agreementLink: { type: String, required: true },
    ipAddress: { type: String, default: null },
    signedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
export default mongoose.model("Agreement", agreementSchema);

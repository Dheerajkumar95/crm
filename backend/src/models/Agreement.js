import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema({
  proposalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true,
  },
  agreementLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Sent", "Accepted"],
    default: "Pending",
  },
  sentAt: {
    type: Date,
  },
  acceptedAt: {
    type: Date,
  },
  ipAddress: {
    type: String,
  },
});

const Agreement = mongoose.model("Agreement", agreementSchema);

export default Agreement;

import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    proposalId: {
      type: String,
      unique: true,
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Accepted", "Rejected"],
      default: "Draft",
    },
    signature: {
      type: String, // base64 or image path
      default: null,
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    proposalLink: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// 🔑 Pre-save hook to auto-generate proposalId
proposalSchema.pre("save", async function (next) {
  if (!this.proposalId) {
    const lastProposal = await this.constructor.findOne().sort({ _id: -1 });

    let newNumber = 1;
    if (lastProposal && lastProposal.proposalId) {
      const lastNumber = parseInt(lastProposal.proposalId.split("-")[1], 10);
      if (!isNaN(lastNumber)) {
        newNumber = lastNumber + 1;
      }
    }

    this.proposalId = `PROP-${newNumber.toString().padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("Proposal", proposalSchema);

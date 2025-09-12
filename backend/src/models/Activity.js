import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["call", "task", "meet"],
      required: true,
    },

    subject: { type: String, required: true },
    description: { type: String },
    comments: { type: String },
    dueDate: { type: Date },
    callComments: { type: String },
    startDateTime: { type: Date },
    endDateTime: { type: Date },
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);

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

    // Common fields
    description: { type: String },
    comments: { type: String },

    // Task
    dueDate: { type: Date },

    // Call
    callComments: { type: String },

    // Meeting
    startDateTime: { type: Date },
    endDateTime: { type: Date },
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);

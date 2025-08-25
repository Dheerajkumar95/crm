import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Resolved", "Closed"],
    default: "New",
  },
  caseOrigin: {
    type: String,
    enum: ["Web", "Email", "Phone", "Chat", "Other"],
    default: "Web",
  },
  type: {
    type: String,
    enum: ["Question", "Problem", "Feature Request"],
    default: "Question",
  },
  contactName: { type: String },
  account: { type: String },
  email: { type: String },
  phone: { type: String },
  category: {
    type: String,
    enum: ["General", "Billing", "Technical", "Support"],
    default: "General",
  },
  dueDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Case = mongoose.model("Case", caseSchema);
export default Case;

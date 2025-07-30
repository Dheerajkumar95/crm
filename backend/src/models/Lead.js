import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phone: String,
    company: String,
    status: String,
    source: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    position: String,
    website: String,
    leadValue: Number,
    assigned: String,
    defaultLanguage: String,
    description: String,
    isPublic: Boolean,
    contactedToday: Boolean,
    accountId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;

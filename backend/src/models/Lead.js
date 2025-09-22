import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: String, required: true },
    Position: { type: String, default: "" },
    Company: { type: String, default: "" },
    Website: { type: String, default: "" },
    PotentialRevenue: { type: String, default: "" },
    Description: { type: String, default: "" },
    Country: { type: String, default: "" },
    ZipCode: { type: String, default: "" },
    City: { type: String, default: "" },
    State: { type: String, default: "" },
    Address: { type: String, default: "" },
    Interest: { type: String, default: "" },
    Status: { type: String, default: "" },
    Source: { type: String, default: "" },
    Assigned: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);

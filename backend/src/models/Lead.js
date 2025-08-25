import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: String, required: true },
    Position: String,
    Company: String,
    website: String,
    ExpectedRevenue: String,
    Description: String,
    Country: String,
    ZipCode: String,
    City: String,
    State: String,
    Address: String,
    status: { type: String, default: "" },
    source: { type: String, default: "" },
    assigned: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);

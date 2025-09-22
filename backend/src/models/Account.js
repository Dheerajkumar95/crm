import mongoose from "mongoose";
const accountSchema = new mongoose.Schema(
  {
    accountId: String,
    Name: String,
    Email: String,
    Phone: String,
    Company: { type: String, default: "" },
    Source: { type: String, default: "" },
    Assigned: { type: String, default: "" },
    Website: { type: String, default: "" },
    Address: { type: String, default: "" },
    City: { type: String, default: "" },
    State: { type: String, default: "" },
    Country: { type: String, default: "" },
    ZipCode: { type: String, default: "" },
    Position: { type: String, default: "" },
    Interest: { type: String, default: "" },
    Description: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;

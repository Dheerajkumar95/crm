import mongoose from "mongoose";
const accountSchema = new mongoose.Schema(
  {
    accountId: String,
    Name: String,
    Email: String,
    Phone: String,
    Company: String,
    source: String,
    assigned: String,
    website: String,
    Address: String,
    City: String,
    State: String,
    Country: String,
    ZipCode: String,
    Position: String,
    Description: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;

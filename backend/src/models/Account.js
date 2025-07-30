const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountId: { type: String, required: true }, // added unique ID
  name: { type: String },
  emailAddress: { type: String },
  phone: { type: String },
  company: { type: String },
  status: { type: String },
  source: { type: String },
  assigned: { type: String },
  website: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
  position: { type: String },
  leadValue: { type: String },
  defaultLanguage: { type: String },
  description: { type: String },
  isPublic: { type: Boolean, default: false },
  contactedToday: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", accountSchema);

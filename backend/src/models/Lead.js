const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  source: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Lost"],
    default: "New",
  },
});
module.exports = mongoose.model("Lead", leadSchema);

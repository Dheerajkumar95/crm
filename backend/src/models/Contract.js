const mongoose = require("mongoose");
const contractSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  amount: Number,
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
});
module.exports = mongoose.model("Contract", contractSchema);

const mongoose = require("mongoose");
const opportunitySchema = new mongoose.Schema({
  title: String,
  value: Number,
  stage: {
    type: String,
    enum: [
      "Prospecting",
      "Proposal",
      "Negotiation",
      "Closed Won",
      "Closed Lost",
    ],
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
});
module.exports = mongoose.model("Opportunity", opportunitySchema);

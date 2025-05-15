const mongoose = require("mongoose");
const caseSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open",
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
});
module.exports = mongoose.model("Case", caseSchema);

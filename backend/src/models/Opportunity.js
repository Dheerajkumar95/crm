const mongoose = require("mongoose");
const opportunitySchema = new mongoose.Schema({
  accountId: String,
  source: String,
  website: String,
});
module.exports = mongoose.model("Opportunity", opportunitySchema);

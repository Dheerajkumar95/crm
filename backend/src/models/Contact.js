const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  accountId: String,
  phone: String,
  emailAddress: String,
  name: String,
});
module.exports = mongoose.model("Contact", contactSchema);

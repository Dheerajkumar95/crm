import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  accountId: String,
  Company: String,
  Phone: String,
  Email: String,
  Name: String,
  source: String,
  assigned: String,
  website: String,
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

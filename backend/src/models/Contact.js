import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  accountId: String,
  Company: String,
  Phone: String,
  Email: String,
  Name: String,
  Source: String,
  Assigned: String,
  Website: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

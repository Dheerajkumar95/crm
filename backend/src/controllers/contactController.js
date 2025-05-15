const Contact = require("../models/Contact");
exports.createContact = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
};
exports.getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

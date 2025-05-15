const Case = require("../models/Case");
exports.createCase = async (req, res) => {
  const cs = new Case(req.body);
  await cs.save();
  res.status(201).json(cs);
};
exports.getCases = async (req, res) => {
  const cases = await Case.find().populate("contactId");
  res.json(cases);
};

const Opportunity = require("../models/Opportunity");
exports.createOpportunity = async (req, res) => {
  const opp = new Opportunity(req.body);
  await opp.save();
  res.status(201).json(opp);
};
exports.getOpportunities = async (req, res) => {
  const opportunities = await Opportunity.find().populate("contactId");
  res.json(opportunities);
};

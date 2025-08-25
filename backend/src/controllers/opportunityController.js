const Opportunity = require("../models/Opportunity");
exports.createOpportunity = async (req, res) => {
  try {
    const { accountId, Company, OpportunityName, Amount } = req.body;
    if (!accountId || !Company || !OpportunityName || !Amount) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const opp = new Opportunity(req.body);
    await opp.save();

    res.status(201).json({ message: "Opportunity created successfully", opp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating opportunity", error });
  }
};
exports.getOpportunities = async (req, res) => {
  const opportunities = await Opportunity.find().populate("contactId");
  res.json(opportunities);
};

const Contract = require("../models/Contract");
exports.createContract = async (req, res) => {
  const contract = new Contract(req.body);
  await contract.save();
  res.status(201).json(contract);
};
exports.getContracts = async (req, res) => {
  const contracts = await Contract.find().populate("contactId");
  res.json(contracts);
};

const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const Contact = require("../models/Contact");
const Opportunity = require("../models/Opportunity");
const Case = require("../models/Case");
const Contract = require("../models/Contract");

router.get("/", async (req, res) => {
  try {
    const leadsCount = await Lead.countDocuments();
    const contactsCount = await Contact.countDocuments();
    const opportunitiesCount = await Opportunity.countDocuments();
    const casesCount = await Case.countDocuments();
    const contractsCount = await Contract.countDocuments();

    res.json({
      leadsCount,
      contactsCount,
      opportunitiesCount,
      casesCount,
      contractsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

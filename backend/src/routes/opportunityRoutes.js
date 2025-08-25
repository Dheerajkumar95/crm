import express from "express";
import Opportunity from "../models/Opportunity.js";
import Contact from "../models/Contact.js";
import Account from "../models/Account.js";
const router = express.Router();

// Get all opportunities
router.get("/", async (req, res) => {
  try {
    const opps = await Opportunity.find().sort({ createdAt: -1 });
    res.status(200).json(opps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching opportunities" });
  }
});

// Get single opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: "Opportunity not found" });
    res.status(200).json(opp);
  } catch (error) {
    res.status(500).json({ message: "Error fetching opportunity" });
  }
});

// Update opportunity
router.put("/:id", async (req, res) => {
  try {
    const updatedOpp = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOpp);
  } catch (err) {
    res.status(500).json({ message: "Error updating opportunity" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Opportunity not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update opportunity" });
  }
});
router.post("/", async (req, res) => {
  try {
    const { accountId, Company, opportunityName, ExpectedRevenue } = req.body;

    if (!accountId || !Company || !opportunityName || !ExpectedRevenue) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newOpp = new Opportunity(req.body);
    await newOpp.save();

    res
      .status(201)
      .json({ message: "Opportunity created successfully", newOpp });
  } catch (error) {
    console.error("Error creating opportunity:", error);
    res.status(500).json({ message: "Error creating opportunity", error });
  }
});
// Delete opportunity (optional)
router.delete("/:id", async (req, res) => {
  try {
    const deletedOpp = await Opportunity.findByIdAndDelete(req.params.id);
    if (!deletedOpp)
      return res.status(404).json({ message: "Opportunity not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting opportunity" });
  }
});
router.get("/:opportunitiesMongoId/account", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(
      req.params.opportunitiesMongoId
    );
    if (!opportunity)
      return res.status(404).json({ message: "Opportunity not found" });

    const account = await Account.findOne({ accountId: opportunity.accountId });
    if (!account) return res.status(404).json({ message: "Account not found" });

    res.status(200).json(account);
  } catch (err) {
    console.error("Error fetching account:", err);
    res.status(500).json({ message: "Error fetching account" });
  }
});

router.get("/:opportunitiesMongoId/contact", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(
      req.params.opportunitiesMongoId
    );
    if (!opportunity)
      return res.status(404).json({ message: "Opportunity not found" });

    const contacts = await Contact.find({ accountId: opportunity.accountId });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Error fetching related contacts" });
  }
});

export default router;

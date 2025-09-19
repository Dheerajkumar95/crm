import express from "express";
import Opportunity from "../models/Opportunity.js";
import Contact from "../models/Contact.js";
import Account from "../models/Account.js";
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.get("/:contactMongoId/account", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactMongoId);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const account = await Account.findOne({ accountId: contact.accountId });
    if (!account) return res.status(404).json({ message: "Account not found" });

    res.status(200).json(account);
  } catch (err) {
    console.error("Error fetching account:", err);
    res.status(500).json({ message: "Error fetching account" });
  }
});
router.get("/:id/opportunity", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const opportunities = await Opportunity.find({
      accountId: contact.accountId,
    });

    res.json(opportunities);
  } catch (err) {
    console.error("Error fetching opportunities:", err);
    res.status(500).json({ message: "Error fetching opportunities" });
  }
});
export default router;

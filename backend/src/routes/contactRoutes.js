import express from "express";
import Opportunity from "../models/Opportunity.js";
import Contact from "../models/Contact.js";
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

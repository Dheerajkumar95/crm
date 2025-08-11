import express from "express";
const router = express.Router();

import {
  getAccount,
  getAccountById,
  updateAccountById,
} from "../controllers/accountController.js";
import Contact from "../models/Contact.js";
import Account from "../models/Account.js";
import Opportunity from "../models/Opportunity.js";

router.get("/", getAccount);
router.get("/:id", getAccountById);
router.patch("/:id", updateAccountById);

router.get("/:accountMongoId/contact", async (req, res) => {
  try {
    const { accountMongoId } = req.params;

    const account = await Account.findById(accountMongoId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const contacts = await Contact.find({ accountId: account.accountId });

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching related contacts" });
  }
});

router.get("/:accountMongoId/opportunity", async (req, res) => {
  try {
    const { accountMongoId } = req.params;

    const account = await Account.findById(accountMongoId);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const opportunities = await Opportunity.find({
      accountId: account.accountId,
    });

    res.json(opportunities);
  } catch (err) {
    console.error("Error fetching opportunities:", err);
    res.status(500).json({ message: "Error fetching opportunities" });
  }
});

export default router;

import Account from "../models/Account.js";
import Contact from "../models/Contact.js";
import Opportunity from "../models/Opportunity.js";
import { generateAccountId } from "../controllers/leadController.js";

export const createAccount = async (req, res) => {
  try {
    const lead = req.body;

    // 1. Generate new accountId
    const newAccountId = await generateAccountId();

    // 2. Save in Account collection
    const account = await Account.create({
      accountId: newAccountId,
      Name: lead.Name,
      Email: lead.Email,
      Phone: lead.Phone,
      Company: lead.Company,
      status: lead.status,
      source: lead.source,
      assigned: lead.assigned,
      website: lead.website,
      Address: lead.Address,
      City: lead.City,
      State: lead.State,
      Country: lead.Country,
      ZipCode: lead.ZipCode,
      Position: lead.Position,
      leadValue: lead.leadValue,
      Description: lead.Description,
      createdAt: new Date(),
    });

    // 3. Save in Contact collection
    const contact = await Contact.create({
      accountId: newAccountId,
      Company: lead.Company,
      Phone: lead.Phone,
      Email: lead.Email,
      Name: lead.Name,
      source: lead.source,
      assigned: lead.assigned,
      website: lead.website,
    });

    // 4. Save in Opportunity collection
    const opportunity = await Opportunity.create({
      accountId: newAccountId,
      Company: lead.Company,
      leadValue: lead.leadValue,
      status: lead.status,
    });

    res.status(201).json({
      message: "Lead saved successfully",
      account,
      contact,
      opportunity,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accounts", error });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    res.json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Failed to fetch account" });
  }
};

export const updateAccountById = async (req, res) => {
  try {
    const updated = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Failed to update account" });
  }
};

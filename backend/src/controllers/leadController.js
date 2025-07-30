import Lead from "../models/Lead.js";
import Account from "../models/Account.js";
import Contact from "../models/Contact.js";
import Opportunity from "../models/Opportunity.js";
const generateAccountId = () => {
  const prefix = "ACC";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${date}-${randomNum}`;
};

export const createLead = async (req, res) => {
  try {
    const accountId = generateAccountId();
    const lead = new Lead({
      ...req.body,
      accountId,
    });

    await lead.save();
    res.status(201).json({ message: "Lead created successfully", lead });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Failed to create lead" });
  }
};
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

import mongoose from "mongoose"; // Make sure this is imported at the top

export const convertLeads = async (req, res) => {
  try {
    const { leadIds } = req.body;

    const leads = await Lead.find({ _id: { $in: leadIds } });

    for (const lead of leads) {
      // Create Account
      const account = await Account.create({
        accountId: lead.accountId,
        name: lead.name,
        emailAddress: lead.emailAddress,
        phone: lead.phone,
        company: lead.company,
        status: lead.status,
        source: lead.source,
        assigned: lead.assigned,
        website: lead.website,
        address: lead.address,
        city: lead.city,
        state: lead.state,
        country: lead.country,
        zipCode: lead.zipCode,
        position: lead.position,
        leadValue: lead.leadValue,
        assigned: lead.assigned,
        defaultLanguage: lead.defaultLanguage,
        description: lead.description,
        isPublic: lead.isPublic,
        contactedToday: lead.contactedToday,
        createdAt: lead.createdAt,
      });

      // Create Contact
      const contact = await Contact.create({
        accountId: lead.accountId,
        phone: lead.phone,
        emailAddress: lead.emailAddress,
        name: lead.name,
      });

      // Create Opportunity
      await Opportunity.create({
        accountId: lead.accountId,
        source: lead.source,
        website: lead.website,
      });
    }

    // Delete converted leads
    await Lead.deleteMany({ _id: { $in: leadIds } });

    res.status(200).json({ message: "Leads converted successfully" });
  } catch (error) {
    console.error("Error in convertLeads:", error);
    res.status(500).json({ error: error.message });
  }
};

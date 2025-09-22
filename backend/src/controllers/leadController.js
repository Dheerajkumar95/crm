import Lead from "../models/Lead.js";
import Account from "../models/Account.js";
import Contact from "../models/Contact.js";
import Opportunity from "../models/Opportunity.js";
import * as XLSX from "xlsx";

export const generateAccountId = async () => {
  const prefix = "L";
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const dateStr = `${dd}${mm}${yy}`;

  let randomStr;
  let accountId;
  let exists = true;

  while (exists) {
    randomStr = String(Math.floor(100 + Math.random() * 900));
    accountId = `${prefix}-${dateStr}-${randomStr}`;
    const existingLead = await Lead.findOne({ accountId });
    if (!existingLead) {
      exists = false;
    }
  }

  return accountId;
};

export const createLead = async (req, res) => {
  try {
    const lead = new Lead({
      ...req.body,
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
export const getSingleLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error("Error fetching single lead:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res
      .status(200)
      .json({ message: "Lead updated successfully", lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);
    res
      .status(500)
      .json({ message: "Failed to update lead", error: error.message });
  }
};
export const convertLeads = async (req, res) => {
  try {
    const { leadIds, accountData, contactData, OpportunityData } = req.body;

    const leads = await Lead.find({ _id: { $in: leadIds } });

    for (const lead of leads) {
      const newAccountId = await generateAccountId();

      const account = await Account.create({
        accountId: newAccountId,
        Name: accountData?.accountName || lead.Name,
        Email: lead.Email,
        Phone: lead.Phone,
        Company: lead.Company,
        Status: lead.Status,
        Source: lead.Source,
        Assigned: lead.Assigned,
        Website: accountData?.website || lead.Website,
        Address: accountData?.address || lead.Address,
        City: lead.City,
        State: lead.State,
        Country: lead.Country,
        ZipCode: lead.ZipCode,
        Position: lead.Position,
        Interest: lead.Interest,
        Description: lead.Description,
        createdAt: lead.createdAt,
      });

      const contact = await Contact.create({
        accountId: newAccountId,
        Company: lead.Company,
        Phone: lead.Phone,
        Email: lead.Email,
        Name: contactData?.contactName || lead.Name,
        Source: lead.Source,
        Assigned: lead.Assigned,
        Website: lead.Website,
        Interest: lead.Interest,
      });

      // Fix Opportunity creation
      if (OpportunityData && OpportunityData.OpportunityName) {
        await Opportunity.create({
          accountId: newAccountId,
          Company: lead.Company,
          PotentialRevenue: lead.PotentialRevenue,
          Source: lead.Source,
          Status: "Prospect", // Or keep lead.Status if needed
          OpportunityName: OpportunityData.OpportunityName, // Save exactly what user typed
        });
      }
    }

    await Lead.deleteMany({ _id: { $in: leadIds } });

    res.status(200).json({
      message:
        "Leads converted successfully with user-provided OpportunityName",
    });
  } catch (error) {
    console.error("Error in convertLeads:", error);
    res.status(500).json({ error: error.message });
  }
};

export const importLeads = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ message: "No file uploaded or file is empty" });
    }
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: "",
    });

    let importedCount = 0;
    let skippedCount = 0;
    let errorMessages = [];
    const seenEmails = new Set();

    for (let row of sheetData) {
      if (!row.Name || !row.Email || !row.Phone) {
        errorMessages.push(
          `Skipped row due to missing required fields: ${JSON.stringify(row)}`
        );
        skippedCount++;
        continue;
      }
      if (seenEmails.has(row.Email)) {
        skippedCount++;
        continue;
      }

      seenEmails.add(row.Email);

      try {
        await Lead.create({
          ...row,
        });
        importedCount++;
      } catch (dbError) {
        console.error("Error saving lead:", dbError);
        errorMessages.push(
          `Failed to save lead for email ${row.Email}: ${dbError.message}`
        );
        skippedCount++;
      }
    }

    return res.status(200).json({
      message: "Import completed",
      importedCount,
      skippedCount,
      errors: errorMessages,
    });
  } catch (error) {
    console.error("Error importing leads:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

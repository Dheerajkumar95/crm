import Account from "../models/Account.js";
import Contact from "../models/Contact.js";
import Opportunity from "../models/Opportunity.js";
import { generateAccountId } from "../controllers/leadController.js";
import XLSX from "xlsx";
export const createAccount = async (req, res) => {
  try {
    const lead = req.body;
    const newAccountId = await generateAccountId();
    const account = await Account.create({
      accountId: newAccountId,
      Name: lead.Name,
      Email: lead.Email,
      Phone: lead.Phone,
      Company: lead.Company,
      Status: lead.Status,
      Source: lead.Source,
      Assigned: lead.Assigned,
      Website: lead.Website,
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
    const contact = await Contact.create({
      accountId: newAccountId,
      Company: lead.Company,
      Phone: lead.Phone,
      Email: lead.Email,
      Name: lead.Name,
      Source: lead.Source,
      Assigned: lead.Assigned,
      Website: lead.Website,
    });

    const opportunity = await Opportunity.create({
      accountId: newAccountId,
      Company: lead.Company,
      leadValue: lead.leadValue,
      Status: lead.Status,
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

export const importAccounts = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded or file is empty",
      });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: "",
    });

    let importedCount = 0;
    let duplicateCount = 0;
    let errorMessages = [];
    let importedAccounts = [];

    for (let row of sheetData) {
      if (!row.Company || !row.Name || !row.Email || !row.Phone) {
        errorMessages.push(
          `Skipped row due to missing required fields (Company, Name, Email, Phone): ${JSON.stringify(
            row
          )}`
        );
        continue;
      }
      const exists = await Account.findOne({ Email: row.Email });
      if (exists) {
        duplicateCount++;
        continue;
      }

      try {
        const accountId = await generateAccountId();

        // Explicitly map all fields, defaulting to ""
        const accountData = {
          accountId,
          Name: row.Name,
          Email: row.Email,
          Phone: row.Phone,
          Company: row.Company,
          Source: row.Source || "",
          Assigned: row.Assigned || "",
          Website: row.Website || "",
          Address: row.Address || "",
          City: row.City || "",
          State: row.State || "",
          Country: row.Country || "",
          ZipCode: row.ZipCode || "",
          Position: row.Position || "",
          Interest: row.Interest || "",
          Description: row.Description || "",
        };

        const account = await Account.create(accountData);
        importedAccounts.push(account);
        importedCount++;
      } catch (dbError) {
        console.error("Error creating account:", dbError);
        errorMessages.push(
          `Failed to save account for email ${row.Email}: ${dbError.message}`
        );
      }
    }

    res.json({
      success: true,
      message: "Accounts import completed",
      importedAccounts,
      importedCount,
      duplicateCount,
      errors: errorMessages,
    });
  } catch (err) {
    console.error("Import error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

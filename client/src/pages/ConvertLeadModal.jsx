import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ConvertLeadModal = ({ open, onClose, selectedLeadIds, refreshLeads }) => {
  // Account options
  const [accountOption, setAccountOption] = useState("new"); // "new" | "existing"
  const [accountName, setAccountName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  // Contact options
  const [contactOption, setContactOption] = useState("new"); 
  const [contactName, setContactName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");

  const [createOpportunity, setCreateOpportunity] = useState(false);
  const [opportunityName, setOpportunityName] = useState("");

 useEffect(() => {
  if (!open) return;

  (async () => {
    try {
      const [accRes, conRes] = await Promise.all([
        axios.get("http://localhost:7000/api/accounts"),
        axios.get("http://localhost:7000/api/contacts"),
      ]);
      setAccounts(accRes.data || []);
      setContacts(conRes.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load Accounts/Contacts");
    }
  })();

  // 🔹 Auto-fill Contact Name from Lead when modal opens
  if (selectedLeadIds?.length > 0 && contactOption === "new") {
    (async () => {
      try {
        const leadRes = await axios.get(
          `http://localhost:7000/api/leads/${selectedLeadIds[0]}`
        );
        const lead = leadRes.data;
        if (lead?.Name) {
          setContactName(lead.Name); // auto-fill but still editable
        }
      } catch (err) {
        console.error("Failed to fetch lead details:", err);
      }
    })();
  }
}, [open, selectedLeadIds, contactOption]);


  // Simple validations
  const missingAccountNew = accountOption === "new" && !accountName.trim();
  const missingAccountExisting = accountOption === "existing" && !selectedAccount;
  const missingContactNew = contactOption === "new" && !contactName.trim();
  const missingContactExisting = contactOption === "existing" && !selectedContact;
  const missingOpportunity = createOpportunity && !opportunityName.trim();

  const canSubmit =
    selectedLeadIds?.length > 0 &&
    !missingAccountNew &&
    !missingAccountExisting &&
    !missingContactNew &&
    !missingContactExisting &&
    !missingOpportunity;

  const handleConvert = async () => {
  if (!canSubmit) {
    toast.error("Please complete required fields.");
    return;
  }

  try {
    const payload = {
      leadIds: selectedLeadIds,
      accountOption,
      contactOption,
      createOpportunity,
      opportunityOption: createOpportunity ? "new" : "skip",
    };
    if (createOpportunity && opportunityName.trim()) {
      payload.opportunityData = {
        opportunityName: opportunityName.trim(),
        status: "Prospect",
      };
    }

    // Account data
    if (accountOption === "new") {
      payload.accountData = {};
      if (accountName.trim()) payload.accountData.accountName = accountName.trim();
      if (address.trim()) payload.accountData.address = address.trim();
      if (website.trim()) payload.accountData.website = website.trim();
    } else {
      payload.accountData = { accountId: selectedAccount };
    }

    // Contact data
    if (contactOption === "new") {
      payload.contactData = {};
      if (contactName.trim()) payload.contactData.contactName = contactName.trim();
    } else {
      payload.contactData = { contactId: selectedContact };
    }

    await axios.post("http://localhost:7000/api/leads/convert", payload);

    toast.success("Lead converted successfully!");
    await refreshLeads?.();
    onClose?.();
  } catch (err) {
    console.error("Error converting lead:", err);
    toast.error(err?.response?.data?.message || "Lead conversion failed!");
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Convert Lead</h2>
          <button onClick={onClose} aria-label="Close curs" className="cursor-pointer">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Account Section */}
        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Account</h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={accountOption === "new"}
                onChange={() => setAccountOption("new")}
              />
              Create New Account
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={accountOption === "existing"}
                onChange={() => setAccountOption("existing")}
              />
              Choose Existing Account
            </label>
          </div>

          {accountOption === "new" ? (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                placeholder="Account Name *"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className={`w-full p-2 border rounded ${missingAccountNew ? "border-red-400" : ""}`}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ) : (
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className={`w-full p-2 border rounded mt-3 ${
                missingAccountExisting ? "border-red-400" : ""
              }`}
            >
              <option value="">Select an account *</option>
              {accounts.map((acc) => (
                <option key={acc._id} value={acc._id}>
                  {acc.Name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Contact Section */}
        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Contact</h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={contactOption === "new"}
                onChange={() => setContactOption("new")}
              />
              Create New Contact
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={contactOption === "existing"}
                onChange={() => setContactOption("existing")}
              />
              Choose Existing Contact
            </label>
          </div>

          {contactOption === "new" ? (
            <input
              type="text"
              placeholder="Contact Name *"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className={`w-full p-2 border rounded mt-3 ${
                missingContactNew ? "border-red-400" : ""
              }`}
            />
          ) : (
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className={`w-full p-2 border rounded mt-3 ${
                missingContactExisting ? "border-red-400" : ""
              }`}
            >
              <option value="">Select a contact *</option>
              {contacts.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Name || [c.firstName, c.lastName].filter(Boolean).join(" ") || c.email}
                </option>
              ))}
            </select>
          )}

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={createOpportunity}
                onChange={(e) => setCreateOpportunity(e.target.checked)}
              />
              <span>Create Opportunity</span>
            </label>
            {createOpportunity && (
              <input
                type="text"
                placeholder="Opportunity Name *"
                value={opportunityName}
                onChange={(e) => setOpportunityName(e.target.value)}
                className={`w-full p-2 border rounded mt-3 ${
                  missingOpportunity ? "border-red-400" : ""
                }`}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConvert}
            disabled={!canSubmit}
            className={`px-4 py-2 rounded text-white ${
              canSubmit ? "bg-green-600 hover:bg-green-700" : "bg-green-400 cursor-not-allowed"
            }`}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertLeadModal;

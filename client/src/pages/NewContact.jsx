import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {X} from 'lucide-react';
const NewContact = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountId: "",
    Company: "",
    Name: "",
    Email: "",
    Phone: "",
    source: "",
    assigned: "",
    website: "",
  });
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/accounts");
        setAccounts(res.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.error("Failed to load accounts");
      }
    };
    fetchAccounts();
  }, []);

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "accountId") {
    const selectedAccount = accounts.find((acc) => acc.accountId === value);
    setFormData({
      ...formData,
      accountId: value, 
      Company: selectedAccount ? selectedAccount.Company : "",
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/contacts", formData);
      toast.success("Contact added successfully!");
      setFormData({
        accountId: "",
        Company: "",
        Name: "",
        Email: "",
        Phone: "",
        source: "",
        assigned: "",
        website: "",
      });
      navigate("/contact");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create contact");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
          Create New Contact
        </h2>
        <button
          onClick={() => navigate('/contact')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Account
          </label>
          <select
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Select Account --</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc.accountId}> 
                {acc.accountId} - {acc.Company}
              </option>
            ))}
          </select>

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            name="Company"
            value={formData.Company}
            readOnly
            className="w-full border bg-gray-100 px-3 py-2 rounded"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Name
          </label>
          <input
            type="text"
            name="Name"
            placeholder="Enter full name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="Email"
            placeholder="Enter email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="Phone"
            placeholder="Enter phone number"
            value={formData.Phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <input
            type="text"
            name="source"
            placeholder="Lead source (e.g. Website, Referral)"
            value={formData.source}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Assigned */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <input
            type="text"
            name="assigned"
            placeholder="Assigned user (e.g. Admin)"
            value={formData.assigned}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="text"
            name="website"
            placeholder="Enter website URL"
            value={formData.website}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition shadow-md"
          >
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewContact;

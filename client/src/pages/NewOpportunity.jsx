import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {X} from 'lucide-react';
const NewOpportunity = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountId: "",
    Company: "",              
    opportunityName: "",
    source: "",
    ExpectedRevenue: "",
    PotentialRevenue: "",
    closeDate: "",
    stage: "",
    status: "",
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
        Company: selectedAccount ? selectedAccount.Company : "", // 🔼 Company
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/opportunities", formData);
      toast.success("Opportunity created successfully!");
      setFormData({
        accountId: "",
        Company: "",
        opportunityName: "",
        source: "",
        ExpectedRevenue: "",
        PotentialRevenue: "",
        closeDate: "",
        stage: "",
        status: "",
      });
      navigate("/opportunitieslist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create opportunity");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-8 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
          Create New Contact
        </h2>
        <button
          onClick={() => navigate('/opportunitieslist')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Select Account */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Account
          </label>
          <select
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Company (auto-filled, read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            name="Company"
            value={formData.Company}
            readOnly
            className="w-full border bg-gray-100 px-3 py-2 rounded-md"
          />
        </div>

        {/* Opportunity Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opportunity Name
          </label>
          <input
            type="text"
            name="opportunityName"
            value={formData.opportunityName}
            onChange={handleChange}
            placeholder="Enter opportunity name"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.source}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Expected Revenue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Revenue
          </label>
          <input
            type="number"
            name="ExpectedRevenue"
            value={formData.ExpectedRevenue}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Potential Revenue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Potential Revenue
          </label>
          <input
            type="number"
            name="PotentialRevenue"
            value={formData.PotentialRevenue}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Close Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Close Date
          </label>
          <input
            type="date"
            name="closeDate"
            value={formData.closeDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Stage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stage
          </label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Stage --</option>
            <option value="Prospecting">Prospect</option>
            <option value="Qualification">Qualify</option>
            <option value="Proposal">Secure</option>
            <option value="Negotiation">Contacted</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Status --</option>
            <option value="Secure">Secure</option>
            <option value="Pending">Pending</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition shadow-md"
          >
            Save Opportunity
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOpportunity;

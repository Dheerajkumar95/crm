import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateCase = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "Low",
    status: "New",
    caseOrigin: "Web",
    type: "Question",
    contactName: "",
    account: "",
    email: "",
    phone: "",
    category: "General",
    dueDate: "",
  });

 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/accounts");
        setAccounts(res.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  const handleAccountChange = (e) => {
    const accountId = e.target.value;
    const selectedAccount = accounts.find((acc) => acc.accountId === accountId);

    if (selectedAccount) {
      setFormData((prev) => ({
        ...prev,
        account: accountId,
        contactName: selectedAccount.Name || "",
        email: selectedAccount.Email || "",
        phone: selectedAccount.Phone || "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, account: accountId }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/cases", formData, {
        withCredentials: true,
      });
      toast.success("Case created successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case!");
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </button>
        <h2 className="text-2xl font-bold text-center flex-1">Create New Case</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            placeholder="Enter case subject"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            placeholder="Enter case details"
          />
        </div>

        {/* Account Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Account</label>
          <select
            name="account"
            value={formData.account}
            onChange={handleAccountChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Select Account --</option>
            {accounts.map((acc) => (
              <option key={acc.accountId} value={acc.accountId}>
                {acc.accountId} - {acc.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Dropdowns: Priority, Status, Type, Case Origin, Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option>Question</option>
              <option>Problem</option>
              <option>Feature Request</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Case Origin</label>
            <select
              name="caseOrigin"
              value={formData.caseOrigin}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option>Web</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Chat</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option>General</option>
              <option>Billing</option>
              <option>Technical</option>
              <option>Support</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Save Case
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCase;

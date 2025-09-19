import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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

  // Fetch accounts
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


  // Submit form
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
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create New Contact
      </h2>
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
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewContact;

// File: frontend/src/pages/Contracts.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    amount: "",
    contactId: "",
  });

  const fetchContracts = async () => {
    const res = await axios.get("http://localhost:5000/api/contracts");
    setContracts(res.data);
  };

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:5000/api/contacts");
    setContacts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/contracts", form);
    setForm({ title: "", startDate: "", endDate: "", amount: "", contactId: "" });
    fetchContracts();
  };

  useEffect(() => {
    fetchContracts();
    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Contracts</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow p-4 rounded max-w-md"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Contract Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="contactId"
          value={form.contactId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Contact</option>
          {contacts.map((contact) => (
            <option key={contact._id} value={contact._id}>
              {contact.firstName} {contact.lastName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Contract
        </button>
      </form>

      {/* Contract List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contracts.map((contract) => (
          <div
            key={contract._id}
            className="border p-4 rounded shadow bg-white"
          >
            <h3 className="font-semibold text-lg">{contract.title}</h3>
            <p>Amount: ₹{contract.amount}</p>
            <p>
              Duration: {contract.startDate?.slice(0, 10)} to {contract.endDate?.slice(0, 10)}
            </p>
            <p>
              Contact: {contract.contactId?.firstName} {contract.contactId?.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracts;

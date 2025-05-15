import React, { useEffect, useState } from "react";
import axios from "axios";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    value: "",
    stage: "Prospecting",
    contactId: "",
  });

  const fetchOpportunities = async () => {
    const res = await axios.get("http://localhost:5000/api/opportunities");
    setOpportunities(res.data);
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
    await axios.post("http://localhost:5000/api/opportunities", form);
    setForm({ title: "", value: "", stage: "Prospecting", contactId: "" });
    fetchOpportunities();
  };

  useEffect(() => {
    fetchOpportunities();
    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Opportunities</h2>

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
          placeholder="Opportunity Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="value"
          value={form.value}
          onChange={handleChange}
          placeholder="Value"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="stage"
          value={form.stage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Prospecting">Prospecting</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed Won">Closed Won</option>
          <option value="Closed Lost">Closed Lost</option>
        </select>
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Opportunity
        </button>
      </form>

      {/* Opportunities List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opp) => (
          <div
            key={opp._id}
            className="border p-4 rounded shadow bg-white"
          >
            <h3 className="font-semibold text-lg">{opp.title}</h3>
            <p>Value: ${opp.value}</p>
            <p>Stage: {opp.stage}</p>
            <p>
              Contact: {opp.contactId?.firstName} {opp.contactId?.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    status: "Open",
    contactId: "",
  });

  const fetchCases = async () => {
    const res = await axios.get("http://localhost:5000/api/cases");
    setCases(res.data);
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
    await axios.post("http://localhost:5000/api/cases", form);
    setForm({ subject: "", description: "", status: "Open", contactId: "" });
    fetchCases();
  };

  useEffect(() => {
    fetchCases();
    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Cases</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow p-4 rounded max-w-md"
      >
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Case
        </button>
      </form>

      {/* Cases List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((cs) => (
          <div key={cs._id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold text-lg">{cs.subject}</h3>
            <p>{cs.description}</p>
            <p>Status: {cs.status}</p>
            <p>
              Contact: {cs.contactId?.firstName} {cs.contactId?.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;
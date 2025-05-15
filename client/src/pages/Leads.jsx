import React, { useEffect, useState } from "react";
import axios from "axios";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", source: "",status: "New" });

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/api/leads");
    setLeads(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   alert("done");
    e.preventDefault();
    await axios.post("http://localhost:5000/api/leads", form);
    setForm({ name: "", email: "", phone: "", source: "",status: "New", });
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Leads</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-4 rounded max-w-md">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" required />
        <input type="text" name="source" value={form.source} onChange={handleChange} placeholder="Source" className="w-full border p-2 rounded" required />
        <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Converted">Converted</option>
      </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Lead</button>
      </form>

      {/* Leads List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (
          <div key={lead._id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <p>Email: {lead.email}</p>
            <p>Phone: {lead.phone}</p>
            <p>Source: {lead.source}</p>
            <p>Status: <span className="font-medium">{lead.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;

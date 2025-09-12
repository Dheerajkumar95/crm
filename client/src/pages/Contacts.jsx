import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/contacts");
        setContacts(res.data || []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="px-6 py-1">
      {/* Table Card */}
      <div className="overflow-hidden rounded shadow-lg bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 font-semibold">Account ID</th>
              <th className="px-6 py-3 font-semibold">Company</th>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Phone</th>
              <th className="px-6 py-3 font-semibold">Website</th>
              <th className="px-6 py-3 font-semibold">Source</th>
              <th className="px-6 py-3 font-semibold">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact._id}
                onClick={() => navigate(`/contacts/${contact._id}`)}
                className={`cursor-pointer transition hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-3 font-mono text-blue-700 whitespace-nowrap">{contact.accountId}</td>
                <td className="px-6 py-3 text-gray-800 font-medium">{contact.Company}</td>
                <td className="px-6 py-3 text-gray-800">{contact.Name}</td>
                <td className="px-6 py-3 text-gray-700">{contact.Email}</td>
                <td className="px-6 py-3 text-gray-700">{contact.Phone}</td>
                <td className="px-6 py-3 text-gray-700">{contact.website}</td>
                <td className="px-6 py-3 text-gray-700">{contact.source}</td>
                <td className="px-6 py-3 text-gray-700">{contact.assigned}</td>
              </tr>
            ))}

            {contacts.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-6 text-center text-gray-500 italic"
                >
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;

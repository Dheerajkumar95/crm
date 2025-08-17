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
    <div className="px-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">contacts</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {contacts.length} contacts
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              0 Lost contacts - 0.00%
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-visible">
        <table className="w-full divide-y divide-gray-200 text-xs">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-1 text-left">ACCOUNT ID</th>
              <th className="px-2 py-1 text-left">Company</th>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Email</th>
              <th className="px-2 py-1 text-left">Phone</th>
              <th className="px-2 py-1 text-left">Website</th>
              <th className="px-2 py-1 text-left">Source</th>
              <th className="px-2 py-1 text-left">Assigned</th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr
                key={contact._id}
                 onClick={() => navigate(`/contacts/${contact._id}`)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-2 py-1 break-words">{contact.accountId}</td>
                <td className="px-2 py-1 break-words">{contact.Company}</td>
                <td className="px-2 py-1 break-words">{contact.Name}</td>
                <td className="px-2 py-1">{contact.Email}</td>
                <td className="px-2 py-1 text-gray-600">{contact.Phone}</td>
                <td className="px-2 py-1 text-gray-600">{contact.website}</td>
                <td className="px-2 py-1 text-gray-600">{contact.source}</td>
                <td className="px-2 py-1 text-gray-600">{contact.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default Contacts;

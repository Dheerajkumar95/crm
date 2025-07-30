import React, { useEffect, useState } from "react";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
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

         

      {/* Table */}
      <div className="w-full overflow-visible">
        <table className="w-full divide-y divide-gray-200 text-xs">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-1"></th>
              <th className="px-2 py-1 text-left">ACCOUNT ID</th>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Email</th>
              <th className="px-2 py-1 text-left">Phone</th>
              <th className="px-2 py-1 text-left">Company</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Source</th>
              <th className="px-2 py-1 text-left">Assigned</th>
              <th className="px-2 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contacts) => (
              <tr key={contacts._id} className="hover:bg-gray-50 cursor-pointer transition-colors">            
                <td className="px-2 py-1 break-words">{contacts.accountId}</td>
                <td className="px-2 py-1 break-words">{contacts.name}</td>
                <td className="px-2 py-1 break-words">{contacts.emailAddress}</td>
                <td className="px-2 py-1">{contacts.phone}</td>
                <td className="px-2 py-1 text-gray-600">{contacts.company}</td>
                <td className="px-2 py-1 text-gray-600">{contacts.status}</td>
                <td className="px-2 py-1 text-gray-600">{contacts.source}</td>
                <td className="px-2 py-1 text-gray-600">{contacts.assigned}</td>
                <td className="px-2 py-1" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-1 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-green-700 hover:bg-green-800 text-white p-1 rounded">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 </div>
  </div>
   </div>
  );
};

export default Contacts;

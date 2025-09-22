import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus,Upload } from "lucide-react";
const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/accounts");
        console.log("Fetched accounts:", res.data);
        setAccounts(res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/account/${id}`);
  };

  return (
    <div className="px-1">
<div className="flex items-center justify-between mb-2 relative">
  <div>
    <span className="bg-cyan-400 text-purple-800 text-sm font-medium px-4 py-1 rounded shadow-sm">
      {accounts.length} Accounts
    </span>
  </div>
  <h1 className="absolute left-1/2 mb-10 transform -translate-x-1/2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-red-500 drop-shadow-lg tracking-wide">
    Accounts
  </h1>
  <div className="flex items-center space-x-2">
    <button
      onClick={() => navigate("/newaccount")}
      className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
    >
      <Plus className="w-4 h-4 mr-2" />
      New Account
    </button>
    <button
      onClick={() => navigate("/accountimport")}
      className="flex items-center px-4 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer"
    >
      <Upload className="w-4 h-4 mr-2" />
      Import Accounts
    </button>
  </div>
</div>
 <div className="overflow-hidden rounded shadow-lg bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-1 font-semibold">Account ID</th>
              <th className="px-2 py-1 font-semibold">Company</th>
              <th className="px-2 py-1 font-semibold">Account Owner</th>
              <th className="px-2 py-1 font-semibold">Email</th>
              <th className="px-2 py-1 font-semibold">Phone</th>
              <th className="px-2 py-1 font-semibold">Website</th>
              <th className="px-2 py-1 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((contact, index) => (
              <tr
                key={contact._id}
                onClick={() => navigate(`/account/${contact._id}`)}
                className={`cursor-pointer transition hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-1 font-mono text-blue-700 whitespace-nowrap">{contact.accountId}</td>
                <td className="px-2 py-1 text-gray-800 font-medium">{contact.Company}</td>
                <td className="px-2 py-1 text-gray-800">{contact.Name}</td>
                <td className="px-2 py-1 text-gray-700">{contact.Email}</td>
                <td className="px-2 py-1 text-gray-700">{contact.Phone}</td>
                <td className="px-2 py-1 text-gray-700">{contact.Website}</td>
                <td className="px-2 py-1 text-gray-700">{contact.Source}</td>
              </tr>
            ))}

            {accounts.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-6 text-center text-gray-500 italic"
                >
                  No accounts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;

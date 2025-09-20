import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import ImportButton from "./ImportAccountButton";
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
    <div className="px-6 py-1">
      <div className="flex flex-col md:flex-row items-end justify-end mb-4">
        <div className="flex items-end space-x-2 mt-1 md:mt-0">
          <button
            onClick={() => navigate("/newaccount")}
            className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Account
          </button>
          <ImportButton
          onImportSuccess={(resData) => {
            if (resData && Array.isArray(resData.importedAccounts)) {
              setAccounts((prev) => [...prev, ...resData.importedAccounts]);
            }
          }}
          />

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded shadow-lg bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-1 font-semibold">Account ID</th>
              <th className="px-6 py-1 font-semibold">Company</th>
              <th className="px-6 py-1 font-semibold">Account Owner</th>
              <th className="px-6 py-1 font-semibold">Email</th>
              <th className="px-6 py-1 font-semibold">Phone</th>
              <th className="px-6 py-1 font-semibold">Website</th>
              <th className="px-6 py-1 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr
                key={account._id}
                onClick={() => handleRowClick(account._id)}
                className={`cursor-pointer transition hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-1 font-mono text-blue-700 whitespace-nowrap">{account.accountId}</td>
                <td className="px-6 py-1 text-gray-800 font-medium">{account.Company}</td>
                <td className="px-6 py-1 text-gray-700">{account.Name}</td>
                <td className="px-6 py-1 text-gray-700">{account.Email}</td>
                <td className="px-6 py-1 text-gray-700">{account.Phone}</td>
                <td className="px-6 py-1 text-gray-700">{account.website}</td>
                <td className="px-6 py-1 text-gray-700">{account.source}</td>
              </tr>
            ))}

            {accounts.length === 0 && (
              <tr>
                <td
                  colSpan="3"
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

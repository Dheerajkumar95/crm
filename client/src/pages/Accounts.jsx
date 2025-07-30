import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- Add this
import { Plus, X, Edit, MessageSquare } from "lucide-react";

const Accounts = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate(); // <-- Add this

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/accounts");
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
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Accounts</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {accounts.length} accounts
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              0 Lost accounts - 0.00%
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
              <th className="px-2 py-1">Account Owner</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr
                key={account._id}
                onClick={() => handleRowClick(account._id)} // <-- Click handler
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-2 py-1 break-words">{account.accountId}</td>
                <td className="px-2 py-1 text-gray-600">{account.company}</td>
                <td className="px-2 py-1 break-words">{account.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Upload } from "lucide-react";
const OpportunitiesList = () => {
  const [opps, setopps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchopps = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/opportunities");
        setopps(res.data);
      } catch (err) {
        console.error("Error fetching opps:", err);
      }
    };
    fetchopps();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/opportunities/${id}`);
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "prospect":
        return "bg-blue-100 text-blue-700";
      case "qualify":
        return "bg-amber-100 text-amber-700";
      case "secure":
        return "bg-purple-100 text-purple-700";
      case "contacted":
        return "bg-cyan-100 text-cyan-700";
      case "closed won":
        return "bg-green-100 text-green-700";
      case "closed lost":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="px-6 py-1">
      <div className="flex flex-col md:flex-row items-end justify-end mb-4">
        <div className="flex items-end space-x-2 mt-1 md:mt-0">
          <button
            onClick={() => navigate("/newopportunity")}
            className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Opportunity
          </button>
          <button
            onClick={() => navigate("/leadaccount")}
            className="flex items-center px-4 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition shadow-sm"
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
              <th className="px-6 py-1 font-semibold">Opportunity ID</th>
              <th className="px-6 py-1 font-semibold">Company</th>
              <th className="px-6 py-1 font-semibold">Opportunity Name</th>
              <th className="px-6 py-1 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {opps.map((opp, index) => (
              <tr
                key={opp._id}
                onClick={() => handleRowClick(opp._id)}
                className={`cursor-pointer transition hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-1 font-mono text-blue-700 whitespace-nowrap">{opp.accountId}</td>
                <td className="px-6 py-1 text-gray-800 font-medium">{opp.Company}</td>
                <td className="px-6 py-1 text-gray-800">{opp.opportunityName}</td>
                <td className="px-6 py-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      opp.status
                    )}`}
                  >
                    {opp.status}
                  </span>
                </td>
              </tr>
            ))}

            {opps.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-6 text-center text-gray-500 italic"
                >
                  No opportunities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunitiesList;

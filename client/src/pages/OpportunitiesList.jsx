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
        return "bg-blue-300 text-blue-700";
      case "qualify":
        return "bg-amber-300 text-amber-700";
      case "secure":
        return "bg-purple-300 text-purple-700";
      case "contacted":
        return "bg-cyan-300 text-cyan-700";
      case "closed won":
        return "bg-green-300 text-green-700";
      case "closed lost":
        return "bg-red-300 text-red-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="px-1">
        <div className="flex items-center justify-between mb-4 relative">
          <div>
            <span className="bg-cyan-400 text-purple-800 text-sm font-medium px-4 py-1 rounded shadow-sm">
              {opps.length} Opportunities
            </span>
          </div>
          <h1 className="absolute left-1/2 mb-10 transform -translate-x-1/2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-red-500 drop-shadow-lg tracking-wide">
            Opportunities
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/newopportunity")}
              className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Opportunity
            </button>
          </div>
        </div>
      <div className="overflow-hidden rounded shadow-lg bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-1 font-semibold">Opportunity ID</th>
              <th className="px-2 py-1 font-semibold">Company</th>
              <th className="px-2 py-1 font-semibold">Opportunity Name</th>
              <th className="px-2 py-1 font-semibold">Status</th>
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
                <td className="px-6 py-2 font-mono text-blue-700 whitespace-nowrap">{opp.accountId}</td>
                <td className="px-2 py-2 text-gray-800 font-medium">{opp.Company}</td>
                <td className="px-2 py-2 text-gray-800">{opp.opportunityName}</td>
                <td className="px-2 py-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">OpportunitiesList</h1>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-auto">
        <table className="w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left">Opportunity ID</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opps.map((opp) => (
              <tr
                key={opp._id}
                onClick={() => handleRowClick(opp._id)}
                className="hover:bg-gray-100 cursor-pointer transition"
              >
                <td className="px-4 py-2 break-all font-mono text-blue-700">{opp.accountId}</td>
                <td className="px-4 py-2 text-gray-700">{opp.Company}</td>
                <td className="px-4 py-2 text-gray-700">{opp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunitiesList;

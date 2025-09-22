import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const CaseList = ({ refresh }) => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/cases");
      setCases(res.data);
    } catch (error) {
      toast.error("Error fetching cases");
    }
  };

  useEffect(() => {
    fetchCases();
  }, [refresh]);

  return (
    <div className="px-1">
     <div className="relative flex flex-col md:flex-row items-center justify-between mb-2">
  <h1 className="absolute left-1/2 mb-10 transform -translate-x-1/2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-red-500 drop-shadow-lg tracking-wide">
    Cases
  </h1>
  <div className="flex items-center space-x-4 mt-10 md:mt-0">
    <span className="bg-cyan-400 text-purple-800 text-sm font-medium px-3 py-1 rounded shadow-sm">
      {cases.length} Cases
    </span>
    <span className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded shadow-sm">
      0 Closed Cases - 0.00%
    </span>
  </div>
  <div className="flex items-center space-x-2 mt-4 md:mt-0">
    <button
      onClick={() => navigate("/cases/new")}
      className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer shadow-sm"
    >
      <Plus className="w-4 h-4 mr-2" />
      New Case
    </button>
  </div>
</div>

      <div className="rounded shadow overflow-hidden border border-gray-200">
        <table className="w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-4 py-1 text-left">Case ID</th>
              <th className="px-4 py-1 text-left">Subject</th>
              <th className="px-4 py-1 text-left">Priority</th>
              <th className="px-4 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((c) => (
              <tr
                key={c._id}
                onClick={() =>  navigate(`/case/${c._id}`)}
                className="hover:bg-gray-100 cursor-pointer transition"
              >
                <td className="px-4 py-1 break-all font-normal text-blue-700">{c.caseId}</td>
                <td className="px-4 py-1 text-gray-700">{c.subject}</td>
                <td className="px-4 py-1 text-gray-700">{c.priority}</td>
                <td className="px-4 py-1 text-gray-700">{c.status}</td>
              </tr>
            ))}
            {cases.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-1 text-gray-500 text-center">
                  No cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseList;

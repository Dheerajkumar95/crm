import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Plus,Trash2 } from "lucide-react";

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
    <div className="px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cases</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {cases.length} cases
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              0 closed cases - 0.00%
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <button
            onClick={() => navigate("/cases/new")}
            className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Case
          </button>
        </div> 
      </div>

      {/* Table */}
      <div className="w-full overflow-auto">
        <table className="w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left">Case ID</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((c) => (
              <tr
                key={c._id}
                onClick={() =>  navigate(`/case/${c._id}`)}
                className="hover:bg-gray-100 cursor-pointer transition"
              >
                <td className="px-4 py-2 break-all font-normal text-blue-700">{c.caseId}</td>
                <td className="px-4 py-2 text-gray-700">{c.subject}</td>
                <td className="px-4 py-2 text-gray-700">{c.priority}</td>
                <td className="px-4 py-2 text-gray-700">{c.status}</td>
              </tr>
            ))}
            {cases.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-gray-500 text-center">
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

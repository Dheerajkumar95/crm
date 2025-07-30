import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Edit, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeadTable = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(leads.map((lead) => lead._id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (id) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleStarLead = (id) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id ? { ...lead, isStarred: !lead.isStarred } : lead
      )
    );
  };

  const handleRowClick = (id) => {
    navigate(`/leads/${id}`);
  };

  const handleConvert = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/leads/convert", {
        leadIds: selectedLeads,
      });

      if (res.status === 200) {
        setLeads((prev) =>
          prev.filter((lead) => !selectedLeads.includes(lead._id))
        );
        setSelectedLeads([]);
        alert("Leads converted successfully!");
      }
    } catch (error) {
      console.error("Convert error:", error);
      alert("Error converting leads");
    }
  };

  return (
     <div className="w-full overflow-visible">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-xs">
          <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700 text-[11px] uppercase font-semibold">
            <tr>
              <th className="px-2 py-2 text-center">
                <input
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  onChange={handleSelectAll}
                  checked={
                    selectedLeads.length === leads.length && leads.length > 0
                  }
                />
              </th>
              <th className="px-2 py-2 text-center">☆</th>
              <th className="px-2 py-2 text-left">Account ID</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">Business</th>
              <th className="px-2 py-2 text-left">Source</th>
              <th className="px-2 py-2 text-left">Stage</th>
              <th className="px-2 py-2 text-left">Since</th>
              <th className="px-2 py-2 text-left">Assigned to</th>
              <th className="px-2 py-2 text-left">Last Talk</th>
              <th className="px-2 py-2 text-left">Next</th>
              <th className="px-2 py-2 text-left">Notes</th>
              <th className="px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleRowClick(lead._id)}
              >
                <td className="px-2 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => handleSelectLead(lead._id)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleStarLead(lead._id)}>
                    <Star
                      className={`h-5 w-5 mx-auto ${
                        lead.isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-2 py-2 text-gray-800">{lead.accountId || "-"}</td>
                <td className="px-2 py-2 text-gray-800">{`${lead.firstName || ""} ${lead.lastName || ""}`}</td>
                <td className="px-2 py-2 text-gray-800">{lead.business || "-"}</td>
                <td className="px-2 py-2 text-gray-800">{lead.source || "-"}</td>

                <td className="px-2 py-2">
                  {lead.stage ? (
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full tracking-wide shadow-sm ${
                        lead.stage === "Demo"
                          ? "bg-blue-100 text-blue-800"
                          : lead.stage === "Proposel"
                          ? "bg-purple-100 text-purple-800"
                          : lead.stage === "Discussion"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead.stage === "Decided"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lead.stage}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-2 py-2 text-gray-600">
                  {lead.since ? new Date(lead.since).toLocaleDateString() : "-"}
                </td>
                <td className="px-2 py-2 text-gray-600">{lead.assignedTo || "-"}</td>
                <td className="px-2 py-2 text-gray-600">{lead.lastTalk || "-"}</td>
                <td className="px-2 py-2 text-gray-600">{lead.next || "-"}</td>
                <td className="px-2 py-2 text-gray-600">{lead.remark || "-"}</td>

                <td className="px-2 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-1 rounded shadow-sm hover:scale-105 transition-transform">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-green-700 hover:bg-green-800 text-white p-1 rounded shadow-sm hover:scale-105 transition-transform">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Convert Button Sticky */}
      {selectedLeads.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t py-2 px-4 flex justify-end shadow z-20 mt-2">
          <button
            onClick={handleConvert}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Convert Selected
          </button>
        </div>
      )}

      {/* ✅ Pagination */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mt-2 sm:mt-0">
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 text-sm rounded-md hover:bg-gray-50">
              10
            </button>
            <span className="mx-2 text-sm text-gray-600">per page</span>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{leads.length}</span> results
            </span>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400"
                disabled
              >
                Previous
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeadTable;
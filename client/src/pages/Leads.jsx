import React, { useEffect, useState } from "react";
import { Edit, MessageSquare, Plus, Upload, ListTodo, Download } from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ConvertLeadModal from "./ConvertLeadModal";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(15);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const navigate = useNavigate();

  const handleConvertClick = () => {
    if (selectedLeadIds.length === 0) return;
    setShowConvertModal(true);
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/leads");
        setLeads(res.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);
  const exportToExcel = () => {
    if (leads.length === 0) {
      toast.error("No leads to export!");
      return;
    }
    const exportData = leads.map((lead) => ({
      Company: lead.Company,
      Name: lead.Name,
      Email: lead.Email,
      Phone: lead.Phone,
      LeadValue: lead.leadValue,
      Status: lead.status,
      Source: lead.source,
      Assigned: lead.assigned,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "leads.xlsx");
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleCheckboxChange = (leadId) => {
    setSelectedLeadIds((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  return loading ? (
    <div className="flex justify-center items-center h-40">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2 text-gray-600 text-sm">Loading leads...</span>
    </div>
  ) : (
    <div className="px-1">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {leads.length} Customers
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              0 Lost Leads - 0.00%
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-1">
          {selectedLeadIds.length > 0 && (
            <button
              onClick={handleConvertClick}
              className="flex items-center px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition cursor-pointer"
            >
              Convert
            </button>
          )}
          <button
            onClick={exportToExcel}
            className="flex items-center px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition cursor-pointer"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>

          <Link
            to="/newleads"
            className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Link>
          <Link
            to="/leadimport"
            className="flex items-center px-4 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Leads
          </Link>
        </div>
      </div>

       <div className="w-full overflow-visible">
        <table className="w-full divide-y divide-gray-200 text-xs">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-2 py-1"></th>
              <th className="px-2 py-1 text-left">Company</th>
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Email</th>
              <th className="px-2 py-1 text-left">Phone</th>
              <th className="px-2 py-1 text-left">LeadValue</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Source</th>
              <th className="px-2 py-1 text-left">Assigned</th>
              <th className="px-2 py-1 text-left">Task</th>
              <th className="px-2 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody  className="bg-white divide-y divide-gray-200">
            {currentLeads.map((lead) => (
              <tr key={lead._id} onClick={() => navigate(`/leads/${lead._id}`)} className="hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-2 py-1" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedLeadIds.includes(lead._id)}
                    onChange={() => handleCheckboxChange(lead._id)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                  />
                </td>
                <td className="px-2 py-1 break-words">{lead.Company}</td>
                <td className="px-2 py-1 break-words">{lead.Name}</td>
                <td className="px-2 py-1 break-words">{lead.Email}</td>
                <td className="px-2 py-1">{lead.Phone}</td>
                <td className="px-2 py-1 text-gray-600">{lead.leadValue}</td>
                <td className="px-2 py-1 text-gray-600">{lead.status}</td>
                <td className="px-2 py-1 text-gray-600">{lead.source}</td>
                <td className="px-2 py-1 text-gray-600">{lead.assigned}</td>
                <td className="px-2 py-1" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Link to={`/tasks/${lead._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded">
                      <ListTodo className="h-4 w-4" />
                    </Link>
                  </div>
                   </td>
                <td className="px-2 py-1" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Link to={`/leads/${lead._id}`} className="bg-orange-500 hover:bg-orange-600 text-white p-1 rounded">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <Link  to={`/messages/${lead._id}`}
                    className="bg-green-700 hover:bg-green-800 text-white p-1 rounded">
                      <MessageSquare className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="mx-2 text-sm text-gray-600">Showing</span>
              <span className="font-medium text-sm">
                {indexOfFirstLead + 1} - {Math.min(indexOfLastLead, leads.length)}
              </span>
              <span className="mx-2 text-sm text-gray-600">of {leads.length} results</span>
            </div>
            <div className="flex items-center space-x-2">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded-l-md border bg-white text-sm hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 rounded-r-md border bg-white text-sm hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <ConvertLeadModal
        open={showConvertModal}
        onClose={() => setShowConvertModal(false)}
        selectedLeadIds={selectedLeadIds}
        refreshLeads={async () => {
          const res = await axios.get("http://localhost:7000/api/leads");
          setLeads(res.data);
          setSelectedLeadIds([]);
        }}
      />
    </div>
  );
};

export default Leads;

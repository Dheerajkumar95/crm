import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

const OpportunityDetails = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    opportunityName: "",
    source: "",
    leadValue: "",
    expectedRevenue: "",
    closeDate: "",
    stage: "",
    status: "",
  });

  const statusOptions = [
    "Prospect",
    "Qualify",
    "Secure",
    "Contracted",
    "Closed Won",
    "Closed Lost",
  ];

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/opportunities/${id}`);
        setOpportunity(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching opportunity:", err);
      }
    };
    fetchOpportunity();
  }, [id]);

  const handleFieldUpdate = async (field, newValue) => {
    try {
      const updated = { ...formData, [field]: newValue };
      await axios.put(`http://localhost:7000/api/opportunities/${id}`, updated);
      setFormData(updated);
    } catch (err) {
      console.error("Error updating field", err);
    }
  };

  if (!opportunity) return <div>Loading...</div>;

  const EditableField = ({ label, field, value, isCurrency = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    const handleSaveClick = () => {
      handleFieldUpdate(field, inputValue);
      setIsEditing(false);
    };

    return (
      <div>
        <p className="text-sm font-medium text-gray-800 mt-4">{label}</p>
        <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
          {isEditing ? (
            <>
              {field === "status" ? (
                <select
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border p-1 text-sm rounded mr-2 flex-1"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border p-1 text-sm rounded mr-2 flex-1"
                />
              )}
              <button
                onClick={handleSaveClick}
                className="text-blue-600 text-sm font-semibold cursor-pointer"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-700">
                {isCurrency && value ? `₹${parseFloat(value).toLocaleString()}` : value || "-"}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 text-gray-800 hover:text-blue-600"
              >
                <Pencil className="h-4 w-4 cursor-pointer" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-inter antialiased flex justify-center">
      <div className="bg-white rounded-b-2xl p-4 w-full max-w-8xl">
        <div className="flex items-center justify-center pb-4 mb-1">
          <h1 className="text-2xl font-bold text-gray-800">Opportunity Details</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <EditableField label="Company" field="company" value={formData.company} />
          <EditableField label="Opportunity Name" field="opportunityName" value={formData.opportunityName} />
          <EditableField label="Source" field="source" value={formData.source} />
          <EditableField label="Amount" field="amount" value={formData.leadValue} isCurrency />
          <EditableField label="Expected Revenue" field="expectedRevenue" value={formData.expectedRevenue} isCurrency />
          <EditableField label="Close Date" field="closeDate" value={formData.closeDate} />
          <EditableField label="Stage" field="stage" value={formData.stage} />
          <EditableField label="Status" field="status" value={formData.status} />
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;

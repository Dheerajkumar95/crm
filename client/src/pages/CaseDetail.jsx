import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ArrowLeft, Edit2 } from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [formData, setFormData] = useState({});


  const fetchCase = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/cases/${id}`);
      setCaseData(res.data);
      setFormData(res.data);
    } catch (error) {
      toast.error("Error fetching case details");
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  if (!caseData) {
    return <div className="p-6 text-gray-500 text-center">Loading case details...</div>;
  }

  // Start editing a field
  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  // Handle field change for nested fields
  const handleChange = (field, value) => {
    // Check if field is nested (contains a dot)
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };


  const getFieldValue = (field) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      return formData[parent] ? formData[parent][child] : '';
    }
    return formData[field] || '';
  };


  const handleSave = async (field) => {
    try {
      await axios.put(`http://localhost:7000/api/cases/${id}`, formData);
      setCaseData(formData);
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      toast.success(`${field} updated successfully`);
    } catch (error) {
      toast.error(`Failed to update ${field}`);
    }
  };

const renderEditableField = (label, field, type = "text", options = []) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-2">
      <span className="font-medium text-gray-600">{label}:</span>
      {isEditing[field] ? (
        type === "select" ? (
          <select
            value={getFieldValue(field)}
            onChange={(e) => handleChange(field, e.target.value)}
            className="border rounded px-2 py-1 w-fit"
          >
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={getFieldValue(field)}
            onChange={(e) => handleChange(field, e.target.value)}
            className="border rounded px-2 py-1 w-fit"
          />
        )
      ) : (
        <span className="text-gray-800">{getFieldValue(field)}</span>
      )}
    </div>

    <div>
      {isEditing[field] ? (
        <button
          onClick={() => handleSave(field)}
          className="text-blue-600 font-medium px-2 py-1 cursor-pointer"
        >
          Save
        </button>
      ) : (
        <Edit2
          className="w-4 h-4 text-gray-500 cursor-pointer"
          onClick={() => handleEditClick(field)}
        />
      )}
    </div>
  </div>
);


  return (
    <div className=" bg-white rounded-lg p-6 w-full mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-blue-600 hover:underline font-medium cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>

      {/* Header */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        {renderEditableField("Subject", "subject")}
      </div>

      {/* Case Details */}
      <div className="bg-white p-6 shadow rounded-lg space-y-3 border">
  <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Case Info</h2>
  <h5 className="text-md font-semibold text-gray-700">Case ID: {formData.caseId}</h5>
  {renderEditableField("Description", "description")}
  {renderEditableField("Priority", "priority", "select", ["Low", "Medium", "High", "Urgent"])}
  {renderEditableField("Status", "status", "select", ["New", "In Progress", "Resolved", "Closed"])}
  {renderEditableField("Type", "type", "select", ["Question", "Problem", "Feature Request"])}
  {renderEditableField("Case Origin", "caseOrigin", "select", ["Web", "Email", "Phone", "Chat", "Other"])}
  {renderEditableField("Contact Name", "contactName")}
</div>

<div className="bg-white p-6 shadow rounded-lg space-y-3 border mt-5">
  <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Account & Dates</h2>
  <h5 className="text-md font-semibold text-gray-700">Account ID: {formData.account}</h5>
  {renderEditableField("Email", "email")}
  {renderEditableField("Phone", "phone")}
  {renderEditableField("Category", "category", "select", ["General", "Billing", "Technical", "Support"])}
  <p className="text-md font-semibold text-gray-700">
    Due Date: {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : ""}
  </p>
  <p className="text-md font-semibold text-gray-700">
    Created By: {formData.user.username}
  </p>
  <p className="text-md font-semibold text-gray-700">
    Created At: {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : ""}
  </p>
</div>

    </div>
  );
};

export default CaseDetail;
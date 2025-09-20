// LeadDetails.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";
import {X, Pencil } from 'lucide-react';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  const inputRef = useRef(null);

  const statusOptions = [
    "Prospect",
    "Qualify",
    "Secure",
    "Contacted",
    "Closed Won",
    "Closed Lost",
  ];

  const sourceOptions = [
    "Website",
    "Referral",
    "Social Media",
    "Facebook",
    "LinkedIn",
    "Twitter",
    "Instagram",
    "India Mart",
    "Email Campaign",
    "Google Ads",
    "Other",
  ];

  const assignedOptions = [
    "Super Admin",
    "Admin",
    "User 1",
    "User 2",
    "User 3",
  ];

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/leads/${id}`);
        setLead(res.data);
      } catch (err) {
        console.error('Error fetching lead details:', err);
        toast.error('Failed to fetch lead details.');
        navigate('/leads');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id, navigate]);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.setSelectionRange && typeof fieldValue === "string") {
        inputRef.current.setSelectionRange(fieldValue.length, fieldValue.length);
      }
    }
  }, [editingField, fieldValue]);

  const handleEditClick = (fieldName, currentValue) => {
    setEditingField(fieldName);
    setFieldValue(currentValue || "");
  };

  const handleSave = async () => {
    if (!editingField) return;
    try {
      await axios.put(`http://localhost:7000/api/leads/${id}`, {
        ...lead,
        [editingField]: fieldValue,
      });
      setLead((prev) => ({ ...prev, [editingField]: fieldValue }));
      setEditingField(null);
      toast.success('Lead updated successfully!');
    } catch (err) {
      console.error("Error updating field:", err);
      toast.error('Failed to update lead.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600 text-sm">Loading lead details...</span>
      </div>
    );
  }

  if (!lead) {
    return <div className="text-center mt-10">Lead not found.</div>;
  }

  const EditableField = ({ label, field, value, options }) => (
    <div>
      <p className="text-sm font-medium text-gray-800 mt-4">{label}</p>
      <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
        {editingField === field ? (
          <>
            {options ? (
              <select
                ref={inputRef}
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                className="border p-1 text-sm rounded mr-2 flex-1"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                ref={inputRef}
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                className="border p-1 text-sm rounded mr-2 flex-1"
              />
            )}
             <button
               onClick={handleSave}
               className="text-blue-600 text-sm font-semibold cursor-pointer"
               >
              Save
              </button>
              <button
              onClick={() => setEditingField(null)}
              className="ml-2 text-gray-500 hover:text-red-500 transition cursor-pointer"
              >
              <X size={18} />
              </button>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-700">
              {value || "-"}
            </span>
            <button
              onClick={() => handleEditClick(field, value)}
              className="ml-2 text-gray-800 hover:text-blue-600"
            >
              <Pencil className="h-4 w-4 cursor-pointer" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-inter antialiased flex justify-center p-6">
      <div className="bg-white rounded-lg p-4 w-full max-w-4xl">
        <div className="flex items-center justify-between pb-4 mb-1">
          <h1 className="text-2xl font-bold text-gray-800">Lead Details</h1>
          <button
            onClick={() => navigate('/leads')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5 inline-block mr-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {/* Left Column */}
          <div className="space-y-0.5">
            <EditableField label="Name" field="Name" value={lead.Name} />
            <EditableField label="Email" field="Email" value={lead.Email} />
            <EditableField label="Phone" field="Phone" value={lead.Phone} />
            <EditableField label="Company" field="Company" value={lead.Company} />
            <EditableField label="Position" field="Position" value={lead.Position} />
            <EditableField label="Website" field="website" value={lead.website} />
            <EditableField label="PotentialRevenue" field="PotentialRevenue" value={lead.PotentialRevenue} />
            <EditableField label="Interest" field="Interest" value={lead.Interest} />
            <EditableField label="Description" field="Description" value={lead.Description} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <EditableField label="Status" field="status" value={lead.status} options={statusOptions} />
            <EditableField label="Source" field="source" value={lead.source} options={sourceOptions} />
            <EditableField label="Assigned" field="assigned" value={lead.assigned} options={assignedOptions} />
            <EditableField label="Address" field="Address" value={lead.Address} />
            <EditableField label="City" field="City" value={lead.City} />
            <EditableField label="State" field="State" value={lead.State} />
            <EditableField label="Country" field="Country" value={lead.Country} />
            <EditableField label="Zip Code" field="ZipCode" value={lead.ZipCode} />

            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Created At</p>
                <p className="text-sm text-gray-600">
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {new Date(lead.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

// ContactDetails.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pencil, X } from "lucide-react";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/contacts/${id}`);
        setContact(res.data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
        toast.error("Failed to fetch contact details.");
      }
    };
    fetchContact();
  }, [id]);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(fieldValue.length, fieldValue.length);
    }
  }, [editingField, fieldValue]);

  const handleEditClick = (fieldName, currentValue) => {
    setEditingField(fieldName);
    setFieldValue(currentValue || "");
  };

  const handleSave = async () => {
    if (!editingField) return;
    try {
      await axios.patch(`http://localhost:7000/api/contacts/${id}`, {
        [editingField]: fieldValue,
      });
      setContact((prev) => ({ ...prev, [editingField]: fieldValue }));
      setEditingField(null);
      toast.success("Contact updated successfully!");
    } catch (err) {
      console.error("Error updating field:", err);
      toast.error("Failed to update contact.");
    }
  };

  if (!contact) return <div className="p-4 text-center">Loading contact details...</div>;

  // Reusable editable field
  const EditableField = ({ label, field, value, nonEditable = false }) => (
    <div>
      <p className="text-sm font-medium text-gray-800 mt-4">{label}</p>
      <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
        {nonEditable ? (
          <span className="text-sm text-gray-700">{value || "—"}</span>
        ) : editingField === field ? (
          <>
            <input
              type="text"
              ref={inputRef}
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="border p-1 text-sm rounded mr-2 flex-1"
            />
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
            <span className="text-sm text-gray-700">{value || "—"}</span>
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
    <div className="min-h-screen font-inter antialiased flex justify-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-6xl">
        <div className="flex items-center justify-center pb-4 mb-1">
          <h1 className="text-2xl font-bold text-gray-800">Contact Details</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-0.5">
            <EditableField label="Account ID" field="accountId" value={contact.accountId} nonEditable />
            <EditableField label="Name" field="Name" value={contact.Name} />
            <EditableField label="Phone" field="Phone" value={contact.Phone} />
            <EditableField label="Email" field="Email" value={contact.Email} />
          </div>
          <div className="space-y-0.5">
            <EditableField label="Company" field="Company" value={contact.Company} nonEditable />
            <EditableField label="Website" field="website" value={contact.website} />
            <EditableField label="Source" field="source" value={contact.source} />
            <EditableField label="Assigned" field="assigned" value={contact.assigned} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

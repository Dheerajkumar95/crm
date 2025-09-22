// AccountDetails.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pencil,X  } from "lucide-react";
import { toast } from "react-hot-toast";

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  // Create a ref for the input element
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/accounts/${id}`);
        setAccount(res.data);
      } catch (error) {
        console.error("Error fetching account:", error);
        toast.error("Failed to fetch account details.");
      }
    };
    fetchAccount();
  }, [id]);

  // Use useEffect to focus the input and set the cursor position
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      // Set cursor position to the end of the text
      inputRef.current.setSelectionRange(fieldValue.length, fieldValue.length);
    }
  }, [editingField, fieldValue]);

  const handleEditClick = (fieldName, currentValue) => {
    setEditingField(fieldName);
    setFieldValue(currentValue);
  };

  const handleSave = async () => {
    if (!editingField) return;
    try {
      await axios.patch(`http://localhost:7000/api/accounts/${id}`, {
        [editingField]: fieldValue,
      });
      setAccount((prev) => ({ ...prev, [editingField]: fieldValue }));
      setEditingField(null);
      toast.success("Account updated successfully!");
    } catch (err) {
      console.error("Error updating field:", err);
      toast.error("Failed to update account.");
    }
  };

  if (!account) return <div className="p-6 text-center">Loading account details...</div>;

const EditableField = ({ label, field, value, isCurrency = false }) => (
  <div>
    <p className="text-sm font-medium text-gray-800 mt-4">{label}</p>
    <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
      {editingField === field ? (
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
          <span className="text-sm text-gray-700">
            {isCurrency && value ? `$${parseFloat(value).toLocaleString()}` : value || "-"}
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
    <div className="min-h-screen font-inter antialiased flex justify-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-8xl">
        <div className="flex items-center justify-center pb-4 mb-1">
          <h1 className="text-2xl font-bold text-gray-800">Account Details</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-0.5">

            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Account ID</p>
              <div className="border p-2 rounded-md bg-gray-100">
                <span className="text-sm text-gray-700">{account.accountId}</span>
              </div>
            </div>

            <EditableField label="Name" field="name" value={account.Name} />
            <EditableField label="Email Address" field="emailAddress" value={account.Email} />
            <EditableField label="Phone" field="phone" value={account.Phone} />
            <EditableField label="Source" field="source" value={account.Source} />
            <EditableField label="Assigned" field="assigned" value={account.Assigned} />
            <EditableField label="Website" field="website" value={account.Website} />
            <EditableField label="Interest of Product" field="Interest" value={account.Interest} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <EditableField label="Address" field="address" value={account.Address} />
            <EditableField label="City" field="city" value={account.City} />
            <EditableField label="State" field="state" value={account.State} />
            <EditableField label="Country" field="country" value={account.Country} />
            <EditableField label="Zip Code" field="zipCode" value={account.ZipCode} />
            <EditableField label="Position" field="position" value={account.Position} />
            <EditableField label="Description" field="description" value={account.Description} />
            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Created At</p>
                <p className="text-sm text-gray-600">
                  {new Date(account.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {new Date(account.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
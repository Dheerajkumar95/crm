import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pencil } from "lucide-react";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/contacts/${id}`);
        setContact(res.data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(contact[field] || "");
  };

  const handleSave = async (field) => {
    try {
      const updatedContact = { ...contact, [field]: tempValue };
      await axios.put(`http://localhost:7000/api/contacts/${id}`, updatedContact);
      setContact(updatedContact);
      setEditingField(null);
      toast.success(`${field} updated!`);
    } catch (error) {
      toast.error("Error updating contact");
    }
  };

  if (!contact) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Contact Details</h1>

      <div className="space-y-4">
        {[
          "accountId",
          "Company",
          "Name",
          "Email",
          "Phone",
          "website",
          "source",
          "assigned",
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field}
            </label>
            <div className="flex items-center border rounded px-2 py-1 bg-gray-50">
              {editingField === field ? (
                <>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleSave(field)}
                    className="ml-2 text-blue-600 font-medium cursor-pointer"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-800">
                    {contact[field] || "—"}
                  </span>
                  <button
                    onClick={() => handleEdit(field)}
                    className="text-gray-700 hover:text-gray-800 cursor-pointer"
                  >
                    <Pencil size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;

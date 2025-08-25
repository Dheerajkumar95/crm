import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pencil, ArrowLeft, X } from "lucide-react";

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
    <div className="w-full mx-auto bg-white shadow-sm rounded-xl p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-blue-600 hover:underline font-medium cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Contact Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          "accountId",
          "Company",
          "Name",
          "Email",
          "Phone",
          "website",
          "source",
          "assigned",
        ].map((field) => {
          const isNonEditable = field === "accountId" || field === "Company";

          return (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {field}
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 transition">
                {isNonEditable ? (
                  <span className="flex-1 text-gray-900 font-medium">
                    {contact[field] || "—"}
                  </span>
                ) : editingField === field ? (
                  <>
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      onClick={() => handleSave(field)}
                      className="ml-2 py-1 text-blue-600 text-sm font-semibold cursor-pointer"
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
                    <span className="flex-1 text-gray-900">
                      {contact[field] || "—"}
                    </span>
                    <button
                      onClick={() => handleEdit(field)}
                      className="text-gray-500 hover:text-blue-600 transition cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetails;

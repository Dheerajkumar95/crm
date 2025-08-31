import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {  ArrowLeft,} from "lucide-react";
const ContactForm = () => {
  const {accountId } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountId: "",
    Company: "",
    Name: "",
    Email: "",
    Phone: "",
    source: "",
    assigned: "",
    website: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/accounts/${accountId}`);
        setFormData((prev) => ({
          ...prev,
          Company: res.data.Company || "",
          accountId:res.data.accountId||"", 
        }));
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };
    fetchContact();
  }, [accountId]);

  // input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/contacts", formData);
      toast.success("Contact added successfully!");
      setFormData({
        accountId: formData.accountId,
        Company: formData.Company,
        Name: "",
        Email: "",
        Phone: "",
        source: "",
        assigned: "",
        website: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message ||"Failed to add contact");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </button>

        <h2 className="text-2xl font-bold text-center flex-1">Add Contact</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

      
        <input
          type="text"
          name="accountId"
          value={formData.accountId}
          readOnly
          className="w-full border px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed"
        />
        <input
          type="text"
          name="Company"
          value={formData.Company}
          readOnly
          className="w-full border px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed"
        />
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Contact Name"
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Source"
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="assigned"
          value={formData.assigned}
          onChange={handleChange}
          placeholder="Assigned To"
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full border px-3 py-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

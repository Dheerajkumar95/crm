import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const LeadForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    business: "",
    address1: "",
    address2: "",
    title: "Mr.",
    firstName: "",
    lastName: "",
    designation: "",
    mobile: "",
    country: "India",
    email: "",
    city: "",
    state: "",
    website: "",
    gstin: "",
    code: "",
    source: "",
    since: "",
    category: "",
    requirement: "",
    product: "",
    potential: "",
    assignedTo: "",
    stage: "",
    remarks: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Lookup for business name
    if (name === "business" && value.length >= 4) {
      try {
        const res = await axios.get(`http://localhost:5000/api/businesses/?search=${value}`);
        setSuggestions(res.data || []);
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else if (name === "business") {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

 const handleSuggestionClick = (suggestion) => {
  setFormData((prev) => ({
    ...prev,
    business: suggestion.name || "",
    address1: suggestion.address1 || "",
    address2: suggestion.address2 || "",
    country: suggestion.country || "",
    city: suggestion.city || "",
    gstin: suggestion.gstin || "",
    code: suggestion.code || "",
    // You can add more fields if needed
  }));
  setSuggestions([]);
  setShowSuggestions(false);
};

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/leads", formData);
      alert("Lead saved successfully");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save lead.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg border w-full max-w-3xl p-4 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Enter Lead</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Core Data */}
        <div className="border p-3 rounded-md mb-4">
          <h3 className="text-green-700 font-semibold mb-3">Core Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Lookup */}
            <div className="relative">
              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder="Company Name or Business Name"
                className="w-full border px-2 py-1 rounded-md"
                autoComplete="off"
              />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
            </div>
            <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" className="border p-2 h-8 rounded-md" />
            <div className="flex gap-1">
              <select name="title" value={formData.title} onChange={handleChange} className="border p-1 h-8 w-13 rounded-md">
                <option>Mr.</option>
                <option>Ms.</option>
              </select>
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 h-8 w-35 rounded-md" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 h-8 w-35 rounded-md" />
            </div>

            <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" className="border p-2 h-8 rounded-md" />
            <input name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" className="border p-2 h-8 rounded-md" />
            <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="border p-2 h-8 rounded-md" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 h-8 rounded-md" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-2 h-8 rounded-md" />
            <select name="state" value={formData.state} onChange={handleChange} className="border p-1 h-8 rounded-md">
              <option>Select State</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Kolkata</option>
            </select>
            <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="border p-2 h-8 rounded-md" />
            <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="border p-2 h-8 rounded-md" />
            <input name="gstin" value={formData.gstin} onChange={handleChange} placeholder="GSTIN" className="border p-2 h-8 rounded-md" />
            <input name="code" value={formData.code} onChange={handleChange} placeholder="Code" className="border p-2 h-8 rounded-md" />
          </div>
        </div>

        {/* Business Opportunity */}
        <div className="border p-3 rounded-md">
          <h3 className="text-green-700 font-semibold mb-3">Business Opportunity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="source" value={formData.source} onChange={handleChange} placeholder="Lead Source" className="border p-2 h-8 rounded-md" />
            <input name="since" type="date" value={formData.since} onChange={handleChange} className="border p-2 h-8 rounded-md" />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 h-8 rounded-md" />
            <input name="requirement" value={formData.requirement} onChange={handleChange} placeholder="Requirement" className="border p-2 h-8 rounded-md" />
            <input name="product" value={formData.product} onChange={handleChange} placeholder="Product" className="border p-2 h-8 rounded-md" />
            <input name="potential" value={formData.potential} onChange={handleChange} placeholder="Potential (₹)" className="border p-2 h-8 rounded-md" />
            <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="border p-1 h-8 rounded-md">
              <option value="">Select Assigned To</option>
              <option>Dheeraj kumar</option>
              <option>Dkumar</option>
              <option>D Kumar</option>
              <option>DK Kumar</option>
            </select>
            <select name="stage" value={formData.stage} onChange={handleChange} className="border p-1 h-8 rounded-md">
              <option value="">Select Stage</option>
              <option>Raw(Unqualified)</option>
              <option>New</option>
              <option>Discussion</option>
              <option>Demo</option>
              <option>Proposal</option>
              <option>Decided</option>
            </select>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remark & Comment" className="border p-2 rounded-md col-span-2" />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
import React, { useState } from "react";
import axios from "axios";

const CopanyFrorm = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState("");

  const [formData, setFormData] = useState({
    businessName: "",
    title: "Mr.",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    website: "",
    industrySegment: "",
    country: "India",
    state: "",
    city: "",
  });

  const typeButtons = [
    { label: "Customer", color: "bg-orange-100 text-orange-600 border-orange-500" },
    { label: "Supplier", color: "bg-blue-100 text-blue-600 border-blue-500" },
    { label: "Neighbour", color: "bg-green-100 text-green-600 border-green-500" },
    { label: "Friend", color: "bg-slate-100 text-slate-600 border-slate-500" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      connectionType: selectedType,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/company", dataToSend);
      console.log("Lead saved successfully", res.data);
      onClose();
    } catch (err) {
      console.error("Error saving lead:", err);
      alert(err.response?.data?.message || "Failed to save lead. Check console.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Enter Connection</h2>
        <div className="flex gap-2">
          <button className="bg-blue-800 text-white px-4 py-1 rounded">Fill using GSTIN</button>
          <button className="bg-green-400 text-white px-4 py-1 rounded">✔ Save</button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">
            Business <span className="text-red-500">*</span>
          </label>
          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            type="text"
            placeholder="Company Name or Business Name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-2 w-full"
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            className="col-span-1 sm:col-span-1 border border-gray-300 rounded h-10 px-2 mt-6"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            className="col-span-1 md:col-span-1 border border-gray-300 rounded h-10 px-2 mt-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="text"
            placeholder="Mobile"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          {typeButtons.map((btn) => (
         <button
           key={btn.label}
           type="button"
           onClick={() => setSelectedType(btn.label)}
           className={`px-3 py-1 rounded-md text-sm border font-medium mr-2 mb-2 ${
             selectedType === btn.label ? btn.color : "border-gray-300 text-gray-700"
           }`}
         >
           {btn.label}
         </button>
         ))}
        </div>

        <p className="font-semibold">Enter More Details</p>
        <div className="mt-3 space-y-4">
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            type="text"
            placeholder="Website"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="industrySegment"
            value={formData.industrySegment}
            onChange={handleChange}
            type="text"
            placeholder="Industry & Segment"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-2 w-full"
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-2 w-full"
            >
              <option value="">Select State</option>
              <option>Karnataka</option>
              <option>New Delhi</option>
              <option>Mumbai</option>
              <option>Bihar</option>
              <option>Madhya Pradesh</option>
              <option>Uttar Pradesh</option>
              <option>Gujarat</option>
              <option>Odisha</option>
            </select>

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          type="button"
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Manage Addresses & GST
        </button>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded"
          >
            ✔ Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CopanyFrorm;

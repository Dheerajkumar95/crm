import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronDown} from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";

const NewLeads = () => {
  const { Lead } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Profile');
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Position: '',
    Company: '',
    website: '',
    PotentialRevenue: '',
    Description: '',
    Country: 'Nothing selected',
    ZipCode: '',
    City: '',
    State: '',
    Address: '',
    status: 'Nothing selected',
    source: 'Nothing selected',
    assigned: 'Super Admin',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Lead(formData);
      navigate('/leads');
      setIsOpen(false);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased flex items-center justify-center">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Add New Lead</h2>
            <button 
              onClick={() => { setIsOpen(false); navigate('/leads'); }} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('Profile')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'Profile'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Form Content */}
          {activeTab === 'Profile' && (
            <form onSubmit={handleSubmit} className="p-6">
              {/* Status, Source, Assigned on one line */}
              <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
                {['status', 'source', 'assigned'].map((key) => (
                  <div key={key} className="flex-1 mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {(key === 'status' || key === 'source') && <span className="text-red-500">*</span>} {key}
                    </label>
                    <div className="relative">
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="appearance-none w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none  pr-10 text-gray-700"
                      >
                        {key === 'status' && <>
                          <option>Nothing selected</option>
                          <option>Prospect</option>
                          <option>Qualify</option>
                          <option>Secure</option>
                          <option>Contacted</option>
                          <option>Closed Won</option>
                          <option>Closed Lost</option>
                        </>}
                        {key === 'source' && <>
                          <option>Nothing selected</option>
                          <option>Website</option>
                          <option>Referral</option>
                          <option>Social Media</option>
                          <option>Facebook</option>
                          <option>LinkedIn</option>
                          <option>Twitter</option>
                          <option>Instagram</option>
                          <option>India Mart</option>
                          <option>Email Campaign</option>
                          <option>Google Ads</option>
                          <option>Other</option>
                        </>}
                        {key === 'assigned' && <>
                          <option>Super Admin</option>
                          <option>Admin</option>
                          <option>User 1</option>
                          <option>User 2</option>
                          <option>User 3</option>
                        </>}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Email
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="Phone" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Phone
                    </label>
                    <input
                      type="tel"
                      id="Phone"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                      required
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label htmlFor="Position" className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      id="Position"
                      name="Position"
                      value={formData.Position}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="Company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="Company"
                      name="Company"
                      value={formData.Company}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>
                  
                  {/* Website */}
                 <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="Description"
                      name="Description"
                      value={formData.Description}
                      onChange={handleChange}
                      className="w-212 p-2 border border-gray-300 rounded-md focus:outline-none  resize-y"
                    ></textarea>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">

                
                  <div>
                    <label htmlFor="PotentialRevenue" className="block text-sm font-medium text-gray-700 mb-1">
                      PotentialRevenue
                    </label>
                    <input
                      type="text"
                      id="PotentialRevenue"
                      name="PotentialRevenue"
                      value={formData.PotentialRevenue}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>
                   

                  {/* Address */}
                  <div>
                    <label htmlFor="Address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      id="Address"
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      className="w-full h-10 p-1 border border-gray-300 rounded-md focus:outline-none  resize-y"
                    ></textarea>
                  </div>
                  
                  {/* City */}
                  <div>
                    <label htmlFor="City" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="City"
                      name="City"
                      value={formData.City}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="State" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="State"
                      name="State"
                      value={formData.State}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>
                  
                  {/* Country */}
                  <div>
                    <label htmlFor="Country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <select
                        id="Country"
                        name="Country"
                        value={formData.Country}
                        onChange={handleChange}
                        className="appearance-none w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none  pr-10 text-gray-700" 
                      >
                        <option>Nothing selected</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label htmlFor="ZipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="ZipCode"
                      name="ZipCode"
                      value={formData.ZipCode}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end p-4 border-t border-gray-200 space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); navigate('/leads'); }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default NewLeads;

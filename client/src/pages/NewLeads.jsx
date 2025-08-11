import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronDown, Check } from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";

const NewLeads = () => {
  const { Lead } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Profile');
  const [formData, setFormData] = useState({
    status: 'Nothing selected',
    source: 'Nothing selected',
    assigned: 'Super Admin',
    tags: '',
    name: '',
    position: '',
    emailAddress: '',
    website: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nothing selected',
    zipCode: '',
    leadValue: '',
    company: '',
    defaultLanguage: 'System Default',
    description: '',
    isPublic: false,
    contactedToday: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
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
            <button onClick={() => { setIsOpen(false); navigate('/leads'); }} className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {['status', 'source', 'assigned'].map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {(key === 'status' || key === 'source') && <span className="text-red-500">*</span>} {key}
                      </label>
                      <div className="relative flex-grow">
                        <select
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="appearance-none w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-gray-700"
                        >
                          {key === 'status' && <>
                            <option>Nothing selected</option>
                            <option>Prospect</option>
                            <option>Qualify</option>
                            <option>Secure</option>
                            <option>Contracted</option>
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
                        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 bg" />
                      </div>
                    </div>
                  ))}

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Email
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Lead Value */}
                  <div>
                    <label htmlFor="leadValue" className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Value
                    </label>
                    <input
                      type="number"
                      id="leadValue"
                      name="leadValue"
                      value={formData.leadValue}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Zip Code */}
                  
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    ></textarea>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    ></textarea>
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="appearance-none w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-gray-700"                      >
                        <option>Nothing selected</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>Canada</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Default Language */}
                  <div>
                    <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                      Default Language
                    </label>
                    <div className="relative">
                      <select
                        id="defaultLanguage"
                        name="defaultLanguage"
                        value={formData.defaultLanguage}
                        onChange={handleChange}
                        className="appearance-none w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-gray-700"                      >
                        <option>System Default</option>
                        <option>English</option>
                        <option>Spanish</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex items-center space-x-6 mt-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${formData.isPublic ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                        {formData.isPublic && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">Public</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="contactedToday"
                        checked={formData.contactedToday}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${formData.contactedToday ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                        {formData.contactedToday && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">Contacted Today</span>
                    </label>
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
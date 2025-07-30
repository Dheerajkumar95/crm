import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil } from "lucide-react";

const AccountDetails = () => {
  const { id } = useParams(); // Get account ID from route
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/accounts/${id}`);
        setAccount(res.data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };
    fetchAccount();
  }, [id]);
const handlePublicChange = (e) => {
    const newValue = e.target.value === 'Yes';
    setAccount(prevDetails => ({
      ...prevDetails,
      isPublic: newValue
    }));
    console.log('Public status changed to:', newValue ? 'Yes' : 'No');
  };

  if (!account) return <div className="p-6 text-center">Loading account details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased flex justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-full">
        {/* Header with Edit button */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Account Details</h1> 
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {/* Left Column */}
          <div className="space-y-0.5">
             <p className="text-base font-medium text-gray-800">Account ID</p>
            <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.accountId}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Name</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.name}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Email Address</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.emailAddress}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Phone</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.phone}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Company</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.company}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Status</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.status}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Source</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.source}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Assigned</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.assigned}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mt-4">Website</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.website}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Address</p>
            <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.address}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">City</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.city}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">State</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.state}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Country</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.country}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Zip Code</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.zipCode}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Position</p>
            <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.position}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Lead Value</p>
              <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">${parseFloat(account.leadValue).toLocaleString()}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Default Language</p>
            <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.defaultLanguage}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Description</p>
            <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
              <span className="text-sm text-gray-700">{account.description}</span>
              <button className="ml-2 text-gray-800 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            </div>
         <div className="flex items-center space-x-4">
              <p className="text-sm font-medium text-gray-800">Public:</p>
              <select
                value={account.isPublic ? "Yes" : "No"}
                onChange={handlePublicChange}
                className="px-2 py-1 rounded-md border border-gray-300 text-xs font-semibold bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Created At</p>
              <p className="text-sm text-gray-800">{new Date(account.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <div className="text-gray-800">{label}</div>
    <div className="font-medium break-words">{value || "-"}</div>
  </div>
);

export default AccountDetails;












































































































































































































































































































































































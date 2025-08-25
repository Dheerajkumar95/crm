import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {  ArrowLeft,} from "lucide-react";
const OpportunityForm = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountId: "",
    Company: "",   
    opportunityName: "",
    source: "",
    ExpectedRevenue: "",
    closeDate: "",
    stage: "",
    status: "Prospect",
  });

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/accounts/${accountId}`);
        setFormData((prev) => ({
          ...prev,
          Company: res.data.Company || "",
          accountId:res.data.accountId||"", 
        }));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch account details");
      }
    };

    if (accountId) fetchAccount();
  }, [accountId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/opportunities", formData);
      toast.success("Opportunity created successfully!");
      navigate(`/account/${accountId}`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message ||"Failed to create opportunity");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
   <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </button>

        <h2 className="text-2xl font-bold text-center flex-1">Create Opportunity</h2>
      </div>
  <div className="mb-6 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4 shadow">
    <div>
      <h3 className="text-sm font-medium opacity-80">Account ID</h3>
      <p className="text-lg font-semibold">{formData.accountId || "N/A"}</p>
    </div>
    <div className="border-l border-white/40 h-10 mx-4"></div>
    <div>
      <h3 className="text-sm font-medium opacity-80">Company</h3>
      <p className="text-lg font-semibold">{formData.Company || "N/A"}</p>
    </div>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col">
      <label className="font-medium mb-1">Opportunity Name</label>
      <input
        type="text"
        name="opportunityName"
        value={formData.opportunityName}
        onChange={handleChange}
        className="border rounded p-2"
      />
    </div>

    {/* Expected Revenue */}
    <div className="flex flex-col">
      <label className="font-medium mb-1">Expected Revenue</label>
      <input
        type="number"
        name="ExpectedRevenue"
        value={formData.ExpectedRevenue}
        onChange={handleChange}
        className="border rounded p-2"
      />
    </div>

    {/* Close Date */}
    <div className="flex flex-col">
      <label className="font-medium mb-1">Close Date</label>
      <input
        type="date"
        name="closeDate"
        value={formData.closeDate}
        onChange={handleChange}
        className="border rounded p-2"
      />
    </div>

    {/* Status */}
    <div className="flex flex-col">
      <label className="font-medium mb-1">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option>Prospect</option>
        <option>Qualify</option>
        <option>Secure</option>
        <option>Contacted</option>
        <option>Closed Won</option>
        <option>Closed Lost</option>
      </select>
    </div>
<div className="flex justify-end">
    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
    >
      Save Opportunity
    </button>
    </div>
  </form>
</div>
  );
};

export default OpportunityForm;

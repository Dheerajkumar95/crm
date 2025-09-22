import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Building, Activity, FileText, ArrowLeft } from "lucide-react";
import ActivityPage from "../components/LeadActivities/ActivityPage";
import LeadDetails from "./LeadDetails"; 

const LeadView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [activeTab, setActiveTab] = useState("Activity");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/leads/${id}`);
        setLead(res.data);
      } catch (error) {
        console.error("Error fetching lead:", error);
      }
    };
    fetchLead();
  }, [id]);

  if (!lead) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="px-1">
      {/* Account Header */}
      <div className="mb-3 bg-blue-50 border rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-1">
            <Building size={48} className="text-purple-500" />
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/lead/${lead._id}`)}
            >
              <h1 className="text-sm font-bold text-slate-800">Lead</h1>
              <p className="text-xl font-semibold text-slate-800">
                {lead.Company}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Phone</p>
            <p className="text-base text-blue-600">{lead?.Phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Website</p>
            <a
              href={
                lead?.Website?.startsWith("http")
                  ? lead.Website
                  : `https://${lead?.Website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-blue-600 cursor-pointer hover:underline"
            >
              {lead?.Website}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Lead Owner</p>
            <p className="text-base text-blue-600">{lead?.Name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-base text-blue-600">{lead?.Email}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("Activity")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "Activity"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          <Activity size={16} /> Activity
        </button>
        <button
          onClick={() => setActiveTab("Details")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "Details"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          <FileText size={16} /> Lead Details
        </button>
      </div>
      <div>
        {activeTab === "Activity" && <ActivityPage leadId={lead._id} />}
        {activeTab === "Details" && <LeadDetails lead={lead} />}
      </div>
    </div>
  );
};

export default LeadView;

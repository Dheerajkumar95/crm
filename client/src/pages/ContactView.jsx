import React, { useEffect, useState } from "react";
import { Building,Activity } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import ActivityButtons from './OppActivity';
import {
  FileText,
  User,
  ArrowDownToLine,
  Trash2,
  Eye,
} from "lucide-react";
import ContactDetails from "./ContactDetails";

const ContactView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setcontact] = useState(null);
  const [activeTab, setActiveTab] = useState("relate");
  const [relatedOpportunities, setRelatedOpportunities] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [showAllOpportunities, setShowAllOpportunities] = useState(false);
  const [showAllCases, setShowAllCases] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [caseData, setCaseData] = useState([]);
  const apiBase = "http://localhost:7000/api/files";

  useEffect(() => {
    fetchcontact();
    fetchOpportunities();
    fetchFiles();
  }, [id]);

 const fetchCases = async (accountId) => {
  try {
    const res = await axios.get(`http://localhost:7000/api/cases/account/${accountId}`);
    setCaseData(res.data);
  } catch (error) {
    toast.error("Error fetching case details");
  }
};

const fetchcontact = async () => {
  try {
    const res = await axios.get(`http://localhost:7000/api/contacts/${id}`);
    setcontact(res.data);
    if (res.data.accountId) {
      fetchCases(res.data.accountId);
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
  }
};
  const fetchOpportunities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/contacts/${id}/opportunity`
      );
      setRelatedOpportunities(res.data || []);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };




  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${apiBase}/account/${id}`);
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

 

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${apiBase}/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      fetchFiles();
      toast.success("File uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${apiBase}/${id}/${filename}`);
      fetchFiles();
      toast.success("File deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete file");
    }
  };


  return (
    <div className="p-4 bg-white rounded-lg from-slate-100 to-white min-h-screen">
       <div className="mb-3 bg-blue-50 border rounded-lg shadow-sm p-4">
      {/* Top Row */}
      <div className="flex justify-between items-start mb-5">
        {/* Left side - Company info */}
        <div className="flex items-center gap-1">
          <Building size={48} className="text-purple-500" />
          <div className="cursor-pointer"
                            onClick={() => navigate(`/contact/${contact._id}`)}>
            <h1 className="text-sm font-bold text-slate-800">contact</h1>
            {contact && (
              <p className="text-xl font-semibold text-slate-800">
                {contact.Company}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-2">
        <div>
          <p className="text-sm font-medium text-gray-600">Phone</p>
          <p className="text-base text-blue-600">{contact?.Phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Website</p>
          <a
            href={contact?.website?.startsWith("http") ? contact.website : `https://${contact?.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-blue-600 cursor-pointer hover:underline"
          >
            {contact?.website}
          </a>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">contact Owner</p>
          <p className="text-base text-blue-600">{contact?.Name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Email</p>
          <p className="text-base text-blue-600">{contact?.Email}</p>
        </div>
      </div>
    </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-lg shadow-sm overflow-hidden border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("relate")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "relate"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <User size={18} />
            Related Info
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "activity"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <Activity size={18} />
            Activity
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "details"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <FileText size={18} />
            contact Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg min-h-[300px] mt-0">
        {activeTab === "relate" ? (
          <div className="space-y-6">
            {/* Opportunities */}
            <div className="border rounded-b-lg bg-gray-50">
              <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                <h2 className="font-semibold text-sm text-slate-700">
                  Opportunities ({relatedOpportunities.length})
                </h2>
                <button
                  onClick={() => navigate(`/opportunities/new/${contact._id}`)}
                  className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100 cursor-pointer"
                >
                  New
                </button>
              </div>
              <div className="p-4 text-sm text-slate-700 grid grid-cols-1 md:grid-cols-4 gap-4">
            {(showAllOpportunities
              ? relatedOpportunities
              : relatedOpportunities.slice(0, 4) 
            ).map((opp, index) => (
              <div key={index} onClick={() => navigate(`/opportunities/${opp._id}`)}
               className="p-3 rounded shadow-sm hover:shadow-md bg-white cursor-pointer">
                <p
                  className="text-blue-600 hover:underline cursor-pointer font-medium"
                >
                  {opp.opportunityName}
                </p>
                <p>Amount: {opp.PotentialRevenue}</p>
                <p>Status: {opp.status}</p>
              </div>
            ))}

            {relatedOpportunities.length === 0 && (
              <p className="col-span-2">No opportunities found.</p>
            )}
          </div>

          {relatedOpportunities.length > 4 && (
            <div
              onClick={() => setShowAllOpportunities(!showAllOpportunities)}
              className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer"
            >
              {showAllOpportunities ? "Show Less" : "View All"}
            </div>
          )}

            </div>

        {/* Support Requests */}
        <div className="border rounded-b-lg bg-gray-50">
          <div className="flex justify-between items-center p-3 border-b bg-gray-100">
            <h2 className="font-semibold text-sm text-slate-700">
              Support Requests ({caseData.length})
            </h2>
            <button
              onClick={() => navigate("/cases/new")}
              className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100 cursor-pointer"
            >
              New
            </button>
          </div>

          <div className="p-4 text-sm text-slate-700 grid grid-cols-4 gap-4">
            {(showAllCases ? caseData : caseData.slice(0, 2)).map((c) => (
              <div key={c._id}
              onClick={() =>  navigate(`/case/${c._id}`)}
              className="p-3 rounded shadow-sm hover:shadow-md bg-white cursor-pointer">
                <p className="text-blue-600 hover:underline font-medium cursor-pointer ">
                  {c.caseId}
                </p>
                <p>Contact Name: {c.contactName}</p>
                <p>Subject: {c.subject}</p>
                <p>Priority: {c.priority}</p>
              </div>
            ))}
            {caseData.length === 0 && (
              <p className="col-span-2">No Requests found.</p>
            )}
          </div>

          {caseData.length > 2 && (
            <div
              onClick={() => setShowAllCases(!showAllCases)}
              className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer"
            >
              {showAllCases ? "Show Less" : "View All"}
            </div>
          )}
        </div>

        {/* Notes & Attachments */}
        <div className="border rounded-b-lg bg-gray-50">
          <div className="flex justify-between items-center p-3 border-b bg-gray-100">
            <h2 className="font-semibold text-sm text-slate-700">
              Notes & Attachments ({files.length})
            </h2>
            <form
              onSubmit={handleUpload}
              className="flex items-center gap-3 rounded px-3 py-2 bg-white shadow-sm"
            >
              <label
                htmlFor="fileUpload"
                className="px-3 py-1 text-xs font-medium border rounded cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700"
              >
                Choose File
              </label>
              <input
                id="fileUpload"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <span className="text-xs text-gray-600">
                {file ? file.name : "No file selected"}
              </span>
              <button
                type="submit"
                className="px-4 py-1 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
              >
                Upload
              </button>
            </form>
          </div>

          {/* File list */}
          <div className="p-4 text-sm text-slate-700 space-y-2">
            {(showAllFiles ? files : files.slice(0, 3)).map((f) => (
              <div
                key={f.id}
                className="flex justify-between items-center pb-1"
              >
                <span>
                  {f.filename} ({Math.round(f.length / 1024)} KB)
                </span>
                <div className="flex gap-2">
                  <a
                    href={`${apiBase}/${id}/${f.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Eye
                      size={20}
                      className="text-gray-600 hover:text-blue-600"
                    />
                  </a>
                  <a
                    href={`${apiBase}/${id}/${f.filename}/download`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowDownToLine
                      size={20}
                      className="text-blue-600 hover:text-blue-800"
                    />
                  </a>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="text-red-600 hover:text-red-500 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {files.length === 0 && <p>No files uploaded.</p>}
          </div>
          {files.length > 3 && (
            <div
              onClick={() => setShowAllFiles(!showAllFiles)}
              className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer"
            >
              {showAllFiles ? "Show Less" : "View All"}
            </div>
          )}
        </div>
      </div>
    ) : (
      
     <div className="text-slate-600">
      {contact ? (
        <>
          {activeTab === "activity" && (
            <div className="space-y-6 p-4">
              <ActivityButtons />
            </div>
          )}

          {activeTab === "details" && <ContactDetails contact={contact} />}
        </>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
    )}
  </div>
  </div>
  );        
};

export default ContactView;

// AccountView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft,
        FileText, 
        User,
        ArrowDownToLine,
        Trash2,
        Eye, 
} from "lucide-react";
import AccountDetails from "./AccountDetails";

const AccountView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [activeTab, setActiveTab] = useState("relate");
  const [relatedContacts, setRelatedContacts] = useState([]);
  const [relatedOpportunities, setRelatedOpportunities] = useState([]);

  // ---- File states ----
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const apiBase = "http://localhost:7000/api/files";

  useEffect(() => {
    fetchAccount();
    fetchContacts();
    fetchOpportunities();
    fetchFiles();  
  }, [id]);

  const fetchAccount = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/accounts/${id}`);
      setAccount(res.data);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/accounts/${id}/contact`
      );
      setRelatedContacts(res.data || []);
    } catch (error) {
      console.error("Error fetching related contacts:", error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/accounts/${id}/opportunity`
      );
      setRelatedOpportunities(res.data || []);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  // ---- File functions ----
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
};;

  return (
    <div className="p-4 bg-white rounded-lg from-slate-100 to-white min-h-screen">
      {/* Header */}
      <div className="mb-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-blue-600 flex items-center cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Account Overview
            </h1>
            {account && (
              <p className="text-sm text-slate-800">
                Account ID:{" "}
                <span className="font-mono text-blue-600">
                  {account.accountId}
                </span>
              </p>
            )}
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
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "details"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <FileText size={18} />
            Account Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg min-h-[300px] mt-0">
        {activeTab === "relate" ? (
          <div className="space-y-6">
            {/* Contacts */}
            <div className="border rounded-b-lg bg-gray-50">
              <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                <h2 className="font-semibold text-sm text-slate-700">
                  Contacts ({relatedContacts?.length || 0})
                </h2>
                <button className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100">
                  New
                </button>
              </div>
              <div className="p-4 text-sm text-slate-700 space-y-4">
                {relatedContacts.length > 0 ? (
                  relatedContacts.map((contact, index) => (
                    <div key={index}
                    onClick={() => navigate(`/contacts/${contact._id}`)}>
                      <p className="text-blue-600 hover:underline cursor-pointer">
                        {contact.Name}
                      </p>
                      <p>
                        Email:{" "}
                        <a
                          href={`mailto:${contact.Email}`}
                          className="text-blue-600"
                        >
                          {contact.Email}
                        </a>
                      </p>
                      <p>
                        Phone:{" "}
                        <a
                          href={`tel:${contact.Phone}`}
                          className="text-blue-600"
                        >
                          {contact.Phone}
                        </a>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No contacts found.</p>
                )}
              </div>
              <div className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                View All
              </div>
            </div>

            {/* Opportunities */}
            <div className="border rounded-b-lg bg-gray-50">
              <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                <h2 className="font-semibold text-sm text-slate-700">
                  Opportunities ({relatedOpportunities?.length || 0})
                </h2>
                <button className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100">
                  New
                </button>
              </div>
              <div className="p-4 text-sm text-slate-700 space-y-4">
                {relatedOpportunities.length > 0 ? (
                  relatedOpportunities.map((opp, index) => (
                    <div key={index}>
                      <p
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate(`/opportunities/${opp._id}`)}
                      >
                        {opp.accountId}
                      </p>
                      <p>Amount: {opp.leadValue}</p>
                      <p>Status: {opp.status}</p>
                    </div>
                  ))
                ) : (
                  <p>No opportunities found.</p>
                )}
              </div>
              <div className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                View All
              </div>
            </div>

            {/* Cases (Static Example) */}
            <div className="border rounded-b-lg bg-gray-50">
              <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                <h2 className="font-semibold text-sm text-slate-700">
                  Support Request (2)
                </h2>
                <button className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100">
                  New
                </button>
              </div>
              <div className="p-4 text-sm text-slate-700 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-600 hover:underline cursor-pointer">
                    00001019
                  </p>
                  <p>Contact Name: Jack Rogers</p>
                  <p>Subject: Structural failure of generator base</p>
                  <p>Priority: High</p>
                </div>
                <div>
                  <p className="text-blue-600 hover:underline cursor-pointer">
                    00001020
                  </p>
                  <p>Contact Name: Jack Rogers</p>
                  <p>Subject: Power generation below stated level</p>
                  <p>Priority: Medium</p>
                </div>
              </div>
              <div className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                View All
              </div>
            </div>

            {/* Notes & Attachments */}
            <div className="border rounded-b-lg bg-gray-50">
              <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                <h2 className="font-semibold text-sm text-slate-700">
                  Notes & Attachments ({files.length})
                </h2>
                <form onSubmit={handleUpload} className="flex items-center gap-3 border rounded px-3 py-2 bg-white shadow-sm">
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
                {files.length > 0 ? (
                  files.map((f) => (
                    <div
                      key={f.id}
                      className="flex justify-between items-center pb-1"
                    >
                      <span>
                        {f.filename} ({Math.round(f.length / 1024)} KB)
                      </span>
                      <div  className="flex gap-2">
                        <a  
                        href={`${apiBase}/${id}/${f.filename}`}  
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Eye size={20} className="text-gray-600 hover:text-blue-600" />
                      </a>
                      <a
                        href={`${apiBase}/${id}/${f.filename}/download`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        <ArrowDownToLine size={20} className="text-blue-600 hover:text-blue-800" />
                      </a>
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="text-red-600 hover:text-red-500 cursor-pointer" title="Delete"
                        >
                         <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No files uploaded.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-slate-600">
            {account ? (
              <AccountDetails account={account} />
            ) : (
              <p>Loading account details...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountView;

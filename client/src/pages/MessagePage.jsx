import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Paperclip, X, ChevronDown } from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from "axios";
import { toast } from "react-hot-toast";

const MessagePage = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState(null);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [form, setForm] = useState({
    from: "SalesTruff@gmail.com",
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
    attachments: [],
  });

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/leads/${leadId}`);
        setLead(res.data);
        setForm((prev) => ({ ...prev, to: res.data.Email }));
      } catch (err) {
        console.error("Error fetching lead:", err);
      }
    };
    fetchLead();
  }, [leadId]);

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (index) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSend = async () => {
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "attachments") {
          form.attachments.forEach((file) => formData.append("attachments", file));
        } else {
          formData.append(key, form[key]);
        }
      });

      await axios.post("http://localhost:7000/api/messages", formData);
      toast.success("Message sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">New Message</h2>
        <Link to="/leads" className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
           <X className="w-4 h-4" />
        </Link>
      </div>

      {/* From */}
      <div className="mb-3 flex items-center">
        <label className="w-20 font-medium">From:</label>
        <input
          type="email"
          value={form.from}
          disabled
          className="flex-1 border rounded px-2 py-1 bg-gray-100"
        />
      </div>

      {/* To */}
      <div className="mb-3 flex items-center">
        <label className="w-20 font-medium">To:</label>
        <input
          type="email"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={() => setShowCc(!showCc)}
          className="ml-2 px-2 text-sm bg-gray-100 rounded text-blue-600 hover:underline cursor-pointer"
        >
          Cc
        </button>
        <button
          onClick={() => setShowBcc(!showBcc)}
          className="ml-1 px-2 text-sm bg-gray-100 rounded text-blue-600 hover:underline cursor-pointer"
        >
          Bcc
        </button>
      </div>

      {/* Cc */}
      {showCc && (
        <div className="mb-3 flex items-center">
          <label className="w-20 font-medium">Cc:</label>
          <input
            type="email"
            value={form.cc}
            onChange={(e) => setForm({ ...form, cc: e.target.value })}
            className="flex-1 border rounded px-2 py-1"
          />
        </div>
      )}

      {/* Bcc */}
      {showBcc && (
        <div className="mb-3 flex items-center">
          <label className="w-20 font-medium">Bcc:</label>
          <input
            type="email"
            value={form.bcc}
            onChange={(e) => setForm({ ...form, bcc: e.target.value })}
            className="flex-1 border rounded px-2 py-1"
          />
        </div>
      )}

      {/* Subject */}
      <div className="mb-3 flex items-center">
        <label className="w-20 font-medium">Subject:</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="flex-1 border rounded px-2 py-1"
        />
      </div>

      {/* Body */}
      <div className="mb-4">
        <ReactQuill
          theme="snow"
          value={form.body}
          onChange={(value) => setForm({ ...form, body: value })}
          className="h-40 mb-8"
        />
      </div>

      {/* Attachments */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer text-blue-600 p-4 bg-gray-100 w-35 rounded h-5 mt-12">
          <Paperclip className="w-4 h-4" />
          <span>Attach files</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleAttachment}
          />
        </label>

        <ul className="mt-2 space-y-1">
          {form.attachments.map((file, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded">
              <span className="text-sm">{file.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4 cursor-pointer" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePage;

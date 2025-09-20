import React, { useRef } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ImportButton = ({ onImportSuccess }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:7000/api/accounts/import",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Accounts imported successfully!");
      if (onImportSuccess) onImportSuccess(res.data.inserted);
      navigate("/account");
    } catch (err) {
      console.error(err);
      toast.error("Failed to import accounts");
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="flex items-center px-4 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition shadow-sm"
      >
        <Upload className="w-4 h-4 mr-2" />
        Import Accounts
      </button>
    </>
  );
};

export default ImportButton;

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const accountColumns = [
  "Name", 
  "Email",
  "Phone",
  "Company",
  "Source",
  "Assigned",
  "Website",
  "Address",
  "City",
  "State",
  "Country",
  "ZipCode",
  "Position",
  "Interest",
  "Description",
];

const sampleData = [
  "Sample Data",
  "abc@gmail.com",
  "1234567890",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
  "Sample Data",
];
export default function ImportAccounts() {
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const downloadSampleExcel = () => {
    const worksheetData = [accountColumns, sampleData];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Accounts");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "sample_accounts.xlsx");
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast.error("Please select a file");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const res = await axios.post("http://localhost:7000/api/accounts/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Accounts imported successfully!");
      navigate("/account");
    } catch (err) {
      console.error(err);
      toast.error("Failed to import accounts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-18 right-4 p-2 rounded-full bg-gray-300 hover:bg-gray-500 transition-colors cursor-pointer z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow border border-gray-200 text-sm text-gray-700 space-y-2">
        <p>
          <strong>1.</strong> Your CSV/Excel file should have column headers in the format below. Ensure UTF-8 encoding to avoid issues.
        </p>
        <p>
          <strong>2.</strong> Date fields should be in <code>Y-m-d</code> format (e.g., 2025-08-11).
        </p>
        <p>
          <strong>3.</strong> Accounts will not import if unique validation fails.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
        <h2 className="font-semibold text-lg">Import Accounts</h2>
        <button
          type="button"
          className="px-4 py-2 border bg-gray-300 rounded hover:bg-gray-100 cursor-pointer"
          onClick={downloadSampleExcel}
        >
          Download Sample
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="hidden md:block overflow-x-auto border border-gray-200 rounded shadow-sm">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                {accountColumns.map((col) => (
                  <th
                    key={col}
                    className={`whitespace-nowrap border border-gray-300 px-2 sm:px-3 py-2 text-left ${
                      ["Name", "Email", "Phone"].includes(col) ? "text-red-600" : ""
                    }`}
                  >
                    {["Name", "Email", "Phone"].includes(col) ? (
                      <>
                        <span className="text-red-600">*</span> {col}
                      </>
                    ) : (
                      col
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50">
                {sampleData.map((cell, i) => (
                  <td key={i} className="whitespace-nowrap border border-gray-300 px-2 sm:px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-2">
          <div className="border border-gray-200 rounded p-3 shadow-sm bg-white">
            {accountColumns.map((col, idx) => (
              <div key={idx} className="flex justify-between border-b last:border-b-0 py-1">
                <span className="font-medium">{["Account Name", "Email", "Phone"].includes(col) ? `* ${col}` : col}</span>
                <span>{sampleData[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form className="space-y-4 mt-4" onSubmit={handleImport}>
        <div>
          <label className="block font-semibold mb-1">
            <span className="text-red-600">*</span> Choose Excel File
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setCsvFile(e.target.files[0])}
            className="block w-full bg-gray-50 text-sm rounded border border-gray-300 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-1 rounded hover:bg-gray-700 w-full sm:w-auto flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Importing..." : "Import"}
          </button>
        </div>
      </form>
    </div>
  );
}

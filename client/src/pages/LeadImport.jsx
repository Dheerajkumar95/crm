import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const leadsColumns = [
  "Name",
  "Email",
  "Phone",
  "Position",
  "Company",
  "Website",
  "PotentialRevenue",
  "Interest",
  "Status",
  "Source",
  "Assigned",
  "Description",
  "Country",
  "ZipCode",
  "City",
  "State",
  "Address",
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
  "Sample Data",
  "Sample Data",
];

export default function ImportLeads() {
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const navigate = useNavigate();
  const downloadSampleExcel = () => {
    const worksheetData = [leadsColumns, sampleData];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Leads");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "sample_leads.xlsx");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!csvFile) {
    alert("Please select a file");
    return;
  }

  setIsLoading(true);
  const formData = new FormData();
  formData.append("file", csvFile);

  try {
    const res = await fetch("http://localhost:7000/api/leads/import-leads", {
      method: "POST",
      body: formData,
    });
    navigate("/leads");
    const data = await res.json();
    if (res.ok) {
      alert(`${data.message}\nImported: ${data.importedCount}${
        data.duplicateCount ? `\nDuplicates skipped: ${data.duplicateCount}` : ''
      }`);
    } else {
      if (data.errorDetails === 'Duplicate key error') {
        alert(`Import partially successful:\n${data.message}\n\nSome leads were skipped due to duplicates.`);
      } else {
        alert(data.message || "Import failed");
      }
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file");
  } finally {
    setIsLoading(false);
  }
};

  const simulateImport = async () => {
    if (!csvFile) {
      alert("Please select a file");
      return;
    }



    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const res = await fetch("http://localhost:7000/api/leads/simulate-import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSimulationResults(data);
        alert(`Simulation Results:\nValid rows: ${data.validCount}\nIssues found: ${data.issueCount}\n\nSample issues:\n${data.sampleIssues.join('\n')}`);
      } else {
        alert(data.message || "Simulation failed");
      }
    } catch (error) {
      alert("Error simulating import");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div>
  <button
    onClick={() => navigate(-1)}
    className="absolute top-18 right-2 p-2 rounded-full bg-gray-300 hover:bg-gray-500 transition-colors cursor-pointer"
  >
    <X className="w-5 h-5" />
  </button>
    <div className="relative max-w-6xl mx-auto px-2 sm:px-4 py-4 space-y-4 font-sans">
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow border border-gray-200 text-sm text-gray-700 space-y-3">
        <p>
          <strong>1.</strong> Your CSV data should be in the format below. The
          first line of your CSV file should be the column headers as in the
          table example. Also make sure that your file is{" "}
          <span className="font-mono">UTF-8</span> to avoid unnecessary encoding
          problems.
        </p>
        <p>
          <strong>2.</strong> If the column you are trying to import is date
          make sure that is formatted in format <code>Y-m-d</code> (2025-08-11).
        </p>
        <p>
          <strong>3.</strong> Based on your leads{" "}
          <span className="text-red-500">unique validation</span> configured{" "}
          <span className="text-blue-600 underline cursor-pointer">
            options
          </span>
          , the lead won't be imported if:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Lead email already exists</li>
        </ul>
        <p>If you still want to import all leads, uncheck all unique validation field</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-2">
        <h2 className="font-semibold text-lg">Import Leads</h2>
        <button
          type="button"
          className="px-4 py-2 border bg-gray-300 border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
          onClick={downloadSampleExcel}
        >
          Download Sample
        </button>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded shadow-sm mb-4">
        <table className="min-w-[900px] w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              {leadsColumns.map((col, i) => (
                <th
                  key={col}
                  className={`whitespace-nowrap border border-gray-300 px-3 py-2 text-left ${
                    col === "Name" || col === "Email" || col === "Phone" ? "text-red-600" : ""
                  }`}
                >
                  {(col === "Name" || col === "Email" || col === "Phone") ? (
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
                <td key={i} className="whitespace-nowrap border border-gray-300 px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {simulationResults && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Simulation Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-700">Total Rows Processed:</p>
              <p className="font-medium">{simulationResults.validCount + simulationResults.issueCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Valid Rows:</p>
              <p className="font-medium text-green-600">{simulationResults.validCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Issues Found:</p>
              <p className="font-medium text-red-600">{simulationResults.issueCount}</p>
            </div>
          </div>
          {simulationResults.issueCount > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Sample Issues:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                {simulationResults.sampleIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <form className="space-y-6 max-w-xl w-full" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1">
            <span className="text-red-600">*</span> Choose CSV File
          </label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              setCsvFile(e.target.files[0]);
              setSimulationResults(null);
            }}
            className="block w-full bg-gray-50 text-sm rounded border border-gray-300 text-gray-600 file:mr-4 file:py-2 file:px-4
             file:rounded file:border-0 file:text-sm file:font-semibold
             file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 w-full sm:w-auto flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Importing...
              </>
            ) : (
              "Import"
            )}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
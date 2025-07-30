import React, { useState } from "react";
import {
  Plus,
  Filter,
  Table,
  Download,
  Upload,
  Settings2,
  List,
  Kanban,
  MoreHorizontal,
} from 'lucide-react';
import LeadTable from "../components/leadTable";
import LeadForm from "../components/LeadForm";
import LeadFilterBar from "../components/LeadFilterBar";
import LeadStatusFilter from "../components/LeadStatusFilter";
const Leads = () => {
    const [showAddModal, setShowAddModal] = useState(false);
  
 
 

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Leads & Prospects</h1>
        <div className="mt-1 sm:mt-0 flex items-center space-x-3">
           <LeadFilterBar />
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="ml-1 mr-2 h-4 w-4" />
            Add Lead
          </button>
          <button
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="-ml-1 mr-2 h-4 w-4" />
            Import
          </button>
          <div className="relative">
            <button className="p-2 text-gray-500 bg-white rounded-md hover:text-gray-700 focus:outline-none">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <LeadStatusFilter />
      <div className="bg-white overflow-hidden">
        <LeadTable/>
      </div>
      {showAddModal && <LeadForm onClose={() => setShowAddModal(false)} />}
    </div>
      
     </>
  );
};

export default Leads;

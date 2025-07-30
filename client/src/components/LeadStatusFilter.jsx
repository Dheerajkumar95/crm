import React, { useState, useEffect } from 'react';
import axios from 'axios';
const LeadStatusFilter = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Active Leads & Prospects' },
    { id: 'raw', name: 'Raw (Unqualified)' },
    { id: 'new', name: 'New' },
    { id: 'discussion', name: 'Discussion' },
    { id: 'demo', name: 'Demo' },
    { id: 'proposal', name: 'Proposal' },
    { id: 'decided', name: 'Decided' },

  ];

  
  const [counts, setCounts] = useState({
    leadsCount: 0,
     
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        setCounts(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };
    fetchCounts();
  }, []);
  return (
    <div className="overflow-x-auto">
      <div className="p-2 flex flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm border rounded-md m-1 transition-colors duration-150 ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-200 p-2 flex flex-wrap">
        <button className="px-4 py-2 text-sm rounded-md m-1 bg-white text-gray-700 hover:bg-gray-100">
          Appointments
        </button>
        <button className="px-4 py-2 text-sm rounded-md m-1 bg-blue-800 text-white">
          Newest First
        </button>
        <button className="px-4 py-2 text-sm rounded-md m-1 bg-white text-gray-700 hover:bg-gray-100">
          Oldest First
        </button>
        <button className="px-4 py-2 text-sm rounded-md m-1 bg-white text-gray-700 hover:bg-gray-100">
          Kanban (Prospects)
        </button>
        <button className="px-4 py-2 text-sm rounded-md m-1 bg-white text-gray-700 hover:bg-gray-100">
          Star Leads
        </button>

        <div className="flex-grow"></div>

       <div className="flex items-center m-1">
          <span className="text-sm font-medium text-gray-700 mr-2">Count:</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
            {counts.leadsCount}
          </span>
       </div>


        <div className="flex items-center m-1">
          <span className="text-sm font-medium text-gray-700 mr-2">Potential:</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">₹ 1,00,000.00</span>
        </div>
      </div>
    </div>
  );
};

export default LeadStatusFilter;

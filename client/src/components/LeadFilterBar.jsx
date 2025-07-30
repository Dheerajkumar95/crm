import React from 'react';
import { Search, Filter } from 'lucide-react';

const LeadFilterBar = () => {
  return (
   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
  {/* Search Input */}
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
      <Search className="h-3.5 w-3.5 text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Search leads..."
      className="block pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Filter Button */}
  <button className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
    <Filter className="h-3.5 w-3.5 mr-1" />
    Filters (0)
  </button>
</div>

  );
};

export default LeadFilterBar;

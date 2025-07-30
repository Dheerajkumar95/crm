import React from 'react';
import { Plus, Grid, List, Settings, Search, SlidersHorizontal, ChevronDown, Download, RefreshCw } from 'lucide-react';

// Main estimate Component
const Estimate = () => {
  // Sample data for the estimates table (currently empty as per image)
  const estimates = [];

  // Sample financial stats (all 0% and 0/0 as per image)
  const stats = [
    { label: 'Draft', percentage: 0, count: '0 / 0', color: 'text-gray-700' },
    { label: 'Sent', percentage: 0, count: '0 / 0', color: 'text-blue-600' },
    { label: 'Expired', percentage: 0, count: '0 / 0', color: 'text-orange-500' },
    { label: 'Declined', percentage: 0, count: '0 / 0', color: 'text-red-600' },
    { label: 'Accepted', percentage: 0, count: '0 / 0', color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Estimates</h1>
        <p className="text-green-600 text-sm cursor-pointer hover:underline">View Financial Stats</p>
      </div>

      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start">
            <div className={`text-sm font-semibold ${stat.color}`}>
              {stat.label} ({stat.percentage}%)
            </div>
            <div className="text-2xl font-bold text-gray-800 mt-1">
              {stat.count}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Top controls: Create New Estimate, Icons, Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm">
              <Plus className="w-5 h-5 mr-2" />
              Create New Estimate
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200 transition-colors">
              <Grid className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200 transition-colors">
              <List className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors shadow-sm">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Middle controls: Display count, Export, Refresh, Search */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-4">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative">
              <select className="estimateearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button className="p-2 rounded-md hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="relative flex-grow md:flex-grow-0 w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            />
          </div>
        </div>

        {/* Estimates Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg flex items-center">
                  Estimate #
                  <ChevronDown className="ml-1 w-4 h-4" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Tax
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estimates.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No entries found
                  </td>
                </tr>
              ) : (
                estimates.map((estimate) => (
                  <tr key={estimate.id}>
                    {/* Render estimate data here if available */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Estimate;

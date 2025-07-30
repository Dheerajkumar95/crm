import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Grid, List, Settings, Search, SlidersHorizontal, ChevronDown, Download } from 'lucide-react';

 
const Proposal = () => {
  // Sample data for the proposals table
  const proposals = [
    {
      id: 'PRO-00001',
      subject: 'mkjhgfd',
      to: 'efeferf',
      total: '$51.00',
      statusDetail: 'Invoiced', // Added for specific styling
      date: '2025-07-23',
      openTill: '2025-07-30',
      project: '',  
      tags: '',  
      dateCreated: '2025-07-23 11:07:00',
      status: 'Accepted',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Left section: New Proposal, Icons */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Link
             to="/newproposal"
             className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
              >
             <Plus className="w-5 h-5 mr-2" />
             New Proposal
           </Link>
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

          {/* Right section: Search, Filters */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors shadow-sm">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Controls above table: Display count, Export */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Show</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <span className="text-gray-700">entries</span>
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors shadow-sm">
          <Download className="w-5 h-5 mr-2" />
          Export
        </button>
      </div>

      {/* Proposals Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                Proposal #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Open Till
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                Date Created
                <ChevronDown className="ml-1 w-4 h-4" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proposals.map((proposal) => (
              <tr key={proposal.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {proposal.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.total}
                  {proposal.statusDetail && (
                    <div className="text-xs text-green-600">
                      {proposal.statusDetail}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.openTill}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.tags}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {proposal.dateCreated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {proposal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-sm text-gray-700">
          Showing <span className="font-semibold">1</span> to <span className="font-semibold">1</span> of <span className="font-semibold">1</span> entries
        </div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Proposal;
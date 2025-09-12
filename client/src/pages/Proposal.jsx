import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Upload } from "lucide-react";

const Proposal = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/proposals/");
        setProposals(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching proposals:", err);
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading proposals...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-1 font-inter antialiased">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {proposals.length} proposals
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {proposals.filter((p) => p.status === "Accepted").length} Accepted
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
              {proposals.filter((p) => p.status === "Draft").length} Draft
            </span>
          </div>
      </div>
      <div className="rounded shadow overflow-hidden border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className=" bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Proposal ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          From
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          To
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Date
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
          Total
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {proposals.length > 0 ? (
        proposals.map((proposal, index) => (
          <tr
            key={proposal._id}
            onClick={() => navigate(`/proposaldetail/${proposal._id}`)}
            className="hover:bg-gray-50 cursor-pointer transition"
          >
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
              {proposal.proposalId}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
              {proposal.from}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
              {proposal.to}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
              {new Date(proposal.date).toLocaleDateString()}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
              ₹{proposal.grandTotal}
            </td>
            <td
              className={`px-6 py-3 whitespace-nowrap text-sm ${
                index === proposals.length - 1 ? "rounded-br-lg" : ""
              }`}
            >
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  proposal.status === "Accepted"
                    ? "bg-green-100 text-green-800"
                    : proposal.status === "Draft"
                    ? "bg-yellow-100 text-yellow-800"
                    : proposal.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {proposal.status}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="6"
            className="text-center p-6 text-gray-500 italic rounded-b-lg"
          >
            No proposals found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Proposal;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProposalDetail = () => {
  const { id } = useParams(); // proposal ID
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/proposals/${id}`);
        setProposal(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching proposal:", err);
        setLoading(false);
      }
    };
    fetchProposal();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading proposal...</p>;
  if (!proposal) return <p className="text-center mt-6">Proposal not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-inter">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Proposal Details</h2>

        <div className="space-y-3">
          <p><strong>Proposal ID:</strong> {proposal.proposalId}</p>
          <p><strong>To:</strong> {proposal.to}</p>
          <p><strong>Date:</strong> {new Date(proposal.date).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{proposal.grandTotal}</p>
          <p><strong>Status:</strong> {proposal.status}</p>
          {proposal.acceptedAt && (
            <p><strong>Accepted At:</strong> {new Date(proposal.acceptedAt).toLocaleString()}</p>
          )}
          <p><strong>IP Address:</strong> {proposal.ipAddress}</p>
          <p>
            <strong>Proposal Link:</strong>{" "}
            <a href={proposal.proposalLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {proposal.proposalLink}
            </a>
          </p>
        </div>

        {proposal.signature && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Signature</h3>
            <img
              src={proposal.signature}
              alt="Signature"
              className="border mt-2 w-64"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDetail;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
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

  const handleSendAgreement = async () => {
    try {
      const res = await axios.post(`http://localhost:7000/api/agreements/from-proposal/${id}`);
      toast.success("Agreement sent successfully!");
      navigate(`/agreement/${res.data._id}`);
    } catch (err) {
      console.error("Error sending agreement:", err);
      toast.error("Failed to send agreement. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading proposal...</p>;
  if (!proposal) return <p className="text-center mt-6">Proposal not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-1 font-inter">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Proposal Details</h2>

        <div className="space-y-3">
          <p><strong>Proposal ID:</strong> {proposal.proposalId}</p>
          <p><strong>To:</strong> {proposal.to}</p>
          <p><strong>Date:</strong> {new Date(proposal.date).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{proposal.grandTotal}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-0.5 rounded text-sm ${
                proposal.status === "Accepted"
                  ? "bg-green-100 text-green-700"
                  : proposal.status === "Draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : proposal.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {proposal.status}
            </span>
          </p>
          {proposal.acceptedAt && (
            <p><strong>Accepted At:</strong> {new Date(proposal.acceptedAt).toLocaleString()}</p>
          )}
          <p><strong>IP Address:</strong> {proposal.ipAddress}</p>
          <p>
            <strong>Proposal Link:</strong>{" "}
            <a
              href={proposal.proposalLink}
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
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
              className="border mt-2 w-84 h-32 object-contain"
            />
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleSendAgreement}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {axiosInstance} from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { Building } from "lucide-react";

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await axiosInstance.get(`/proposals/${id}`);
        setProposal(res.data.proposal || null);
        setAccount(res.data.account || null);
      } catch (err) {
        toast.error("Failed to fetch proposal");
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  const handleSendAgreement = async () => {
    try {
      const res = await axiosInstance.post(`/agreements/from-proposal/${id}`);
      toast.success("Agreement sent successfully!");
      navigate(`/agreement/${res.data._id}`);
    } catch (err) {
      toast.error("Failed to send agreement. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading proposal...</p>;
  if (!proposal) return <p className="text-center mt-6">Proposal not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="mb-3 bg-blue-50 border rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <Building size={48} className="text-purple-500" />
            <div>
              <h1 className="text-sm font-bold text-slate-800">Account</h1>
              <p className="text-xl font-semibold text-slate-800">
                {account?.Company || account?.Name || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Phone</p>
            <p className="text-base text-blue-600">{account?.Phone || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Website</p>
            {account?.website ? (
              <a
                href={account.website.startsWith("http") ? account.website : `https://${account.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-blue-600 cursor-pointer hover:underline"
              >
                {account.website}
              </a>
            ) : (
              <p className="text-base text-blue-600">—</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Account Owner</p>
            <p className="text-base text-blue-600">{account?.Name || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-base text-blue-600">{account?.Email || proposal?.to || "—"}</p>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Proposal Details</h2>
        <div className="space-y-3">
          <p><strong>Proposal ID:</strong>{proposal.proposalId || proposal._id}</p>
          <p><strong>To:</strong>{proposal.to}</p>
          <p><strong>Date:</strong>{proposal.date ? new Date(proposal.date).toLocaleString() : "—"}</p>
          <p><strong>Total:</strong>₹{proposal.grandTotal?.toLocaleString() ?? "0"}</p>
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
          <p><strong>IP Address:</strong>
          {proposal.ipAddress || "—"}</p>
          <p>
            <strong>Proposal Link:</strong>{" "}
            {proposal.proposalLink ? (
              <a
                href={proposal.proposalLink}
                className="text-blue-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                {proposal.proposalLink}
              </a>
            ) : (
              "—"
            )}
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

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSendAgreement}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Agreement
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;

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
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Proposal Details
        </h1>
      </div>
      <div className="max-full mx-auto bg-white shadow-lg rounded p-8 border border-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
    <p>
      <span className="font-medium text-gray-900"><strong>Proposal ID: </strong></span>{" "}
      {proposal.proposalId || proposal._id}
    </p>
    <p><strong>Status: </strong><span
      className={`px-3 py-1 rounded text-sm font-medium ${
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
    </span></p>
    <p>
      <span className="font-medium text-gray-900"><strong>To:</strong></span> {proposal.to}
    </p>
    <p>
      <span className="font-medium text-gray-900"><strong>Date:</strong></span>{" "}
      {proposal.date ? new Date(proposal.date).toLocaleString() : "—"}
    </p>
    <p>
      <span className="font-medium text-gray-900"><strong>Total:</strong></span>{" "}
      ₹{proposal.grandTotal?.toLocaleString() ?? "0"}
    </p>
    {proposal.acceptedAt && (
      <p>
        <span className="font-medium text-gray-900"><strong>Accepted At:</strong></span>{" "}
        {new Date(proposal.acceptedAt).toLocaleString()}
      </p>
    )}
    <p>
      <span className="font-medium text-gray-900"><strong>IP Address:</strong></span>{" "}
      {proposal.ipAddress || "—"}
    </p>
    <p className="col-span-2">
      <span className="font-medium text-gray-900"><strong>Proposal Link:</strong></span>{" "}
      {proposal.proposalLink ? (
        <a
          href={proposal.proposalLink}
          className="text-blue-600 underline hover:text-blue-800"
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

  {/* Signature */}
  {proposal.signature && (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800">Signature</h3>
      <div className="mt-3 border rounded p-3 bg-gray-50 flex justify-center">
        <img
          src={proposal.signature}
          alt="Signature"
          className="h-32 object-contain"
        />
      </div>
    </div>
  )}

  {/* Actions */}
  <div className="mt-5 flex gap-4">
    <button
      onClick={handleSendAgreement}
      className="bg-blue-600 text-white px-5 py-1 rounded hover:bg-blue-700 transition"
    >
      Send Agreement
    </button>
    <button
      onClick={() => navigate(-1)}
      className="bg-gray-100 text-gray-800 px-5 py-1 rounded hover:bg-gray-200 transition"
    >
      Back
    </button>
  </div>
</div>

    </div>
  );
};

export default ProposalDetail;

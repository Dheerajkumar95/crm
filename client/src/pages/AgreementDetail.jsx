import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AgreementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgreement = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/agreements/${id}`);
        setAgreement(res.data);
      } catch (err) {
        console.error("Error fetching agreement:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgreement();
  }, [id]);

  const handleGenerateInvoice = () => {
    navigate(`/invoice/${agreement._id}`);
  };
  if (loading) return <p className="text-center mt-6">Loading Agreement...</p>;
  if (!agreement) return <p className="text-center mt-6 text-red-500">Agreement not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Agreement Details
        </h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p><strong>Agreement ID: </strong>{agreement.agreementId}</p>
        </div>
        <div>
          <p><strong>Status: </strong><span
          className={`px-2 py-0.5 text-sm font-semibold rounded ${
            agreement.status === "Accepted"
              ? "bg-green-100 text-green-800"
              : agreement.status === "Draft"
              ? "bg-yellow-100 text-yellow-800"
              : agreement.status === "Rejected"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {agreement.status}
        </span></p>
        </div>
        <div>
          <p><strong>To: </strong>{agreement.to}</p>
        </div>
        <div>
          <p><strong>Grand Total: </strong>₹{agreement.grandTotal}</p>
        </div>
        <div>
          <p><strong>Created At: </strong>{new Date(agreement.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p><strong>Signed At: </strong>{agreement.signedAt
              ? new Date(agreement.signedAt).toLocaleString()
              : "Not signed yet"}
          </p>
        </div>
        <div>
          <p><strong>IP Address: </strong>{agreement.ipAddress}</p>
        </div>
        <div>
          <p><strong>Agreement Link: </strong></p>
          <a
            href={agreement.agreementLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            View Document
          </a>
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Vendor Signature</h2>
          {agreement.vendorSignature ? (
            <img
              src={agreement.vendorSignature}
              alt="Vendor Signature"
              className="border rounded-md max-h-40 object-contain"
            />
          ) : (
            <p className="text-gray-500 italic">Not signed</p>
          )}
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Client Signature</h2>
          {agreement.clientSignature ? (
            <img
              src={agreement.clientSignature}
              alt="Client Signature"
              className="border rounded-md max-h-40 object-contain"
            />
          ) : (
            <p className="text-gray-500 italic">Not signed</p>
          )}
        </div>
         <div>
          <button
            onClick={handleGenerateInvoice}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementDetails;

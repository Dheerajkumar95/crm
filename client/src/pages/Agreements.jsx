import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Agreements = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/agreements");
        setAgreements(res.data);
      } catch (err) {
        console.error("Error fetching agreements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading Agreements...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-1 font-inter antialiased">
    <div className="relative flex flex-col md:flex-row items-center justify-between mb-2">
      <h1 className="absolute left-1/2 mb-10 transform -translate-x-1/2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-red-500 drop-shadow-lg tracking-wide">
        Agreements
      </h1>
      <div className="flex items-center space-x-4">
        <span className="bg-cyan-400 text-purple-800 text-sm font-medium px-3 py-1 rounded">
          {agreements.length} Agreements
        </span>
        <span className="bg-green-300 text-green-800 text-sm font-medium px-3 py-1 rounded">
          {agreements.filter((p) => p.status === "Accepted").length} Accepted
        </span>
        <span className="bg-yellow-300 text-yellow-800 text-sm font-medium px-3 py-1 rounded">
          {agreements.filter((p) => p.status === "Draft").length} Draft
        </span>
      </div>
    </div>
      <div className="rounded shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-1 text-left text-xs font-semibold uppercase tracking-wider">
                Agreement ID
              </th>
              <th className="px-6 py-1 text-left text-xs font-semibold uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-1 text-left text-xs font-semibold uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-1 text-left text-xs font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-1 text-left text-xs font-semibold uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-1 text-left text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agreements.length > 0 ? (
              agreements.map((agreement, index) => (
                <tr
                  key={agreement._id}
                  onClick={() => navigate(`/agreements/${agreement._id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agreement.agreementId}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-700">
                    Vendor
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-700">
                    {agreement.to}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-700">
                    {new Date(agreement.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-700">
                    ₹{agreement.grandTotal}
                  </td>
                  <td
                    className={`px-6 py-1 whitespace-nowrap text-sm ${
                      index === agreements.length - 1 ? "rounded-br-lg" : ""
                    }`}
                  >
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${
                        agreement.status === "Accepted"
                          ? "bg-green-300 text-green-800"
                          : agreement.status === "Draft"
                          ? "bg-yellow-300 text-yellow-800"
                          : agreement.status === "Rejected"
                          ? "bg-red-300 text-red-800"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {agreement.status}
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
                  No Agreements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agreements;

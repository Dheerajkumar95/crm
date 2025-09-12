import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { toast } from "react-hot-toast";
const ProposalPage = () => {
  const { id } = useParams();
  const sigPad = useRef(null);

  const [products, setProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/opportunityProducts/${id}`
        );
        setProducts(res.data || []);
        setLoading(false);

        const total = res.data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setGrandTotal(total);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    const fetchOpportunity = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/opportunities/${id}/account`
        );
        setOpportunity(res.data);
      } catch (err) {
        console.error("Error fetching opportunity:", err);
      }
    };

    fetchProducts();
    fetchOpportunity();
  }, [id]);

  const handleClear = () => sigPad.current.clear();

  const handleAccept = async () => {
    if (sigPad.current.isEmpty()) {
      toast.error("Please sign before accepting!");
      return;
    }

    const signatureData = sigPad.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    try {
      await axios.post(`http://localhost:7000/api/proposals/accept/${id}`, {
        signature: signatureData,
      });
      toast.success("Proposal Accepted");
    } catch (err) {
      console.error("Error accepting proposal:", err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading proposal...</p>;

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-indigo-100 to-indigo-300">
        <img
          src="/crm.png"
          alt="Company Logo"
          className="mx-auto w-24 h-24 md:w-32 md:h-32 object-contain mb-4"
        />
        <h1 className="text-3xl md:text-4xl mb-30 font-extrabold text-gray-800">
          SalesTruff Pvt Ltd
        </h1>
        <h2 className="text-2xl md:text-3xl mb-30 font-bold text-pink-600">
          Proposal for:
        </h2>
        <div className="mt-6 space-y-2">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">
            {opportunity?.Company}
          </h1>
          <p className="text-sm md:text-base">
            Date: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            {opportunity?.Address}, {opportunity?.City}, {opportunity?.State},{opportunity?.Country}
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            📞 {opportunity?.Phone} | ✉️ {opportunity?.Email}
          </p>
        </div>
      </section>
      <section className="py-10 px-4 bg-gray-50">
        <div className="w-full mx-auto bg-white shadow-md rounded-xl overflow-hidden">
          <h2 className="text-xl md:text-2xl font-semibold py-4 text-center border-b">
            Product Details
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="p-3">{item.productName}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-center">₹{item.price}</td>
                      <td className="p-3 text-center">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500 italic"
                    >
                      No products added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Grand Total */}
          <div className="flex justify-end p-4 border-t bg-gray-50">
            <p className="text-base md:text-lg font-semibold">
              Grand Total:{" "}
              <span className="text-green-500 font-bold">₹{grandTotal}</span>
            </p>
          </div>

          {/* Signature + Button */}
          <div className="max-w-3xl w-full mx-auto p-6">
            <p className="font-medium mb-2">Signature:</p>
            <SignatureCanvas
              ref={sigPad}
              canvasProps={{
                className:
                  "border-2 w-full h-40 md:h-48 bg-gray-50 rounded shadow-inner",
              }}
            />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
          <button
            onClick={handleClear}
            className="px-4 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 w-full sm:w-auto"
          >
            Clear Signature
          </button>

          <button
            onClick={handleAccept}
            className="px-6 py-1 bg-green-500 text-white font-semibold rounded shadow-lg hover:bg-green-700 transition w-full sm:w-auto mt-2 sm:mt-0"
          >
            Accept Proposal
          </button>
        </div>
      </div>
    </div>
 </section>
</div>
  );
};

export default ProposalPage;

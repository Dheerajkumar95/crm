import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

const ProposalPage = () => {
  const { id } = useParams();
  const sigPad = useRef(null);

  const [products, setProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState(null);

  // Fetch products
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
          `http://localhost:7000/api/opportunities/${id}`
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
    alert("Please sign before accepting!");
    return;
  }

  const signatureData = sigPad.current
  .getTrimmedCanvas()
  .toDataURL("image/png");

  try {
    await axios.post(`http://localhost:7000/api/proposals/accept/${id}`, {
  signature: signatureData,
  });
    alert("Proposal Accepted with Signature!");
  } catch (err) {
    console.error("Error accepting proposal:", err);
    alert("Something went wrong!");
  }
};


  if (loading) return <p className="text-center mt-6">Loading proposal...</p>;

  return (
    <div className="w-full bg-white">
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-indigo-100 to-indigo-300">
        <img
          src="/crm.png"
          alt="Company Logo"
          className="mx-auto w-32 h-32 object-contain mb-4"
        />
        <h1 className="text-4xl font-extrabold text-gray-800">SalesTruff Pvt Ltd</h1>
        <h1 className="text-4xl mt-25 font-bold text-pink-600">Proposal for:</h1>
        <div className="mt-30">
         <h1 className="text-4xl font-extrabold text-gray-800">{opportunity.Company}</h1>
        <p>Date: {new Date().toLocaleDateString()} </p>
        <p className="text-gray-600 ">123, Business Street, Delhi, India</p>
        <p className="text-gray-600">
          📞 +91-9876543210 | ✉️ contact@abc.com
        </p></div>
      </section>

      {/* Product Details */}
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-gray-50">
        <div className="max-w-6xl w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Product Details
          </h2>
          <table className="w-full border-collapse shadow-lg rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border text-left">Product</th>
                <th className="p-3 border text-center">Qty</th>
                <th className="p-3 border text-center">Price</th>
                <th className="p-3 border text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-3">{item.productName}</td>
                    <td className="border p-3 text-center">{item.quantity}</td>
                    <td className="border p-3 text-center">₹{item.price}</td>
                    <td className="border p-3 text-center">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4 border text-gray-500 italic"
                  >
                    No products added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="mt-1 text-right text-lg font-bold">
            Grand Total: <span className="text-gray-900">₹{grandTotal}</span>
          </p>
        </div>
      </section>

      <section className="h-screen flex flex-col justify-center items-center px-6 bg-white">
        <div className="max-w-3xl w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center"> 📝 Agreement </h2>
         <div className="text-2sm ml-20 text-gray-900 mb-6 leading-relaxed space-y-2">
           <p className="text-start">
             1. The client agrees to purchase the products listed above at the stated prices and quantities.
           </p>
           <p className="text-start">
             2. All prices mentioned are final and inclusive of applicable taxes unless otherwise specified.
           </p>
           <p className="text-start">
             3. Delivery of products will be made within the agreed timeline after acceptance of this proposal.
           </p>
           <p className="text-start">
             4. Any changes in order quantity or product specifications must be confirmed in writing.
           </p>
           <p className="text-start">
             5. Payment terms shall be as mutually agreed upon between both parties.
           </p>
           <p className="text-start">
             6. The proposal is valid for 30 days from the date of issuance unless extended in writing.
           </p>
           <p className="text-start">
             7. The client confirms that the product details and quantities have been reviewed and approved.
           </p>
           <p className="text-start">
             8. Upon acceptance, this proposal shall be treated as a binding contract between both parties.
           </p>
           <p className="text-start">
             9. Cancellation or modification after acceptance may incur additional charges.
           </p>
           <p className="text-start">
             10. The client acknowledges and agrees to abide by the terms and conditions of this proposal.
           </p>
         </div>

          <div className="mb-6">
            <p className="font-medium mb-2">Client Signature:</p>
            <SignatureCanvas
              ref={sigPad}
              canvasProps={{
                className:
                  "border-2 w-full h-44 bg-gray-50 rounded shadow-inner",
              }}
            />
            <button
              onClick={handleClear}
              className="px-4 py-1 mt-3 bg-gray-200 text-sm rounded hover:bg-gray-300"
            >
              Clear Signature
            </button>
          </div>

          <button
            onClick={handleAccept}
            className="w-full md:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded shadow-lg hover:bg-green-700 transition"
          >
            Accept Proposal
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProposalPage;

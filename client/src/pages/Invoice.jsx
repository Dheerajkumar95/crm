import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Manual Discount + GST
  const [discountRate, setDiscountRate] = useState();
  const [gstRate, setGstRate] = useState();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/invoices/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading Invoice...</p>;
  }

  if (!data) {
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        Invoice not found
      </p>
    );
  }

  const { agreement, proposal, products } = data;

  // 🔹 Calculate totals
  const subtotal = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const discount = (subtotal * discountRate) / 100;
  const afterDiscount = subtotal - discount;
  const gst = (afterDiscount * gstRate) / 100;
  const grandTotal = afterDiscount + gst;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl font-sans">
        {/* Invoice Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <svg
              className="absolute top-0 left-0 w-full h-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="currentColor"
                d="M0,160L48,165.3C96,171,192,181,288,181.3C384,181,480,171,576,170.7C672,171,768,181,864,170.7C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              SalesTruff
            </h1>
            <p className="text-lg md:text-xl font-medium mt-4 md:mt-0">
              NO: {agreement.agreementId}
            </p>
          </div>
          <div className="relative z-10 text-right mt-4 md:mt-8 text-white/90">
            <p className="font-semibold text-lg md:text-xl">
              Date: {new Date(agreement.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-8 md:p-12">
          {/* Bill To & From */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 mb-8 md:mb-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                Bill To:
              </h2>
              <p className="text-lg font-semibold text-gray-900">
                {agreement.to}
              </p>
              <p className="text-gray-600">Email: {agreement.to}</p>
            </div>
            <div className="w-full md:w-1/2 md:text-right">
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                From:
              </h2>
              <p className="text-lg font-semibold text-gray-900">
                SalesTruff Pvt Ltd
              </p>
              <p className="text-gray-600">+91-9304719585</p>
              <p className="text-gray-600">Gurgaon, India</p>
            </div>
          </div>

          {/* Product Table */}
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-5 bg-blue-800 text-white font-semibold text-sm md:text-base py-3 px-4">
              <div className="col-span-2">Description</div>
              <div className="text-center">Qty</div>
              <div className="text-center">Rate</div>
              <div className="text-right">Total</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-200">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="grid grid-cols-5 text-gray-800 text-sm md:text-base py-3 px-4"
                >
                  <div className="col-span-2">{p.productName}</div>
                  <div className="text-center">{p.quantity}</div>
                  <div className="text-center">
                    {p.price.toLocaleString("en-IN")}
                  </div>
                  <div className="text-right">
                    {(p.price * p.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-6">
            <div className="bg-gray-50 rounded-lg p-6 w-full max-w-md shadow-md space-y-2">
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {/* Manual Discount Input */}
              <div className="flex justify-between items-center text-gray-700 font-medium">
                <span>Discount (%)</span>
                <input
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-20 p-1 border rounded text-right"
                />
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Discount Amount</span>
                <span>- {discount.toLocaleString("en-IN")}</span>
              </div>

              {/* Manual GST Input */}
              <div className="flex justify-between items-center text-gray-700 font-medium">
                <span>GST (%)</span>
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="w-20 p-1 border rounded text-right"
                />
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>GST Amount</span>
                <span>+ {gst.toLocaleString("en-IN")}</span>
              </div>

              <hr />
              <div className="flex justify-between text-lg font-bold text-blue-800">
                <span>Grand Total</span>
                <span>{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Notes & Payment Info */}
          <div className="flex flex-col md:flex-row justify-between items-start mt-12 gap-8 md:gap-0">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Note:</h3>
              <p className="text-gray-600">Thank you for your business!</p>
            </div>
            <div className="w-full md:w-1/2 md:text-right">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                Payment Information:
              </h3>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Bank:</span> Axis
                Bank
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">A/C:</span>{" "}
                1234567890
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">IFSC:</span>{" "}
                UTIB0001234
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center md:text-right">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 italic">
              Thank You!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

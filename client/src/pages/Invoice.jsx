import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discountRate, setDiscountRate] = useState(0);
  const [gstRate, setGstRate] = useState(0);
  const invoiceRef = useRef();

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

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "1.125rem" }}>Loading Invoice...</p>;
  if (!data)
    return <p style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "1.125rem", color: "#dc2626" }}>Invoice not found</p>;

  const { agreement, products } = data;

  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const discount = (subtotal * discountRate) / 100;
  const afterDiscount = subtotal - discount;
  const gst = (afterDiscount * gstRate) / 100;
  const grandTotal = afterDiscount + gst;

  const handleDownloadPDF = async () => {
  try {
    const clonedNode = invoiceRef.current.cloneNode(true);
    clonedNode.querySelectorAll("input").forEach((input) => {
      const span = document.createElement("span");
      span.innerText = input.value;
      span.style.fontWeight = "500";
      span.style.textAlign = "right";
      input.parentNode.replaceChild(span, input);
    });
    clonedNode.style.position = "absolute";
    clonedNode.style.left = "-9999px";
    clonedNode.style.top = "0";
    document.body.appendChild(clonedNode);
    const canvas = await html2canvas(clonedNode, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });
    document.body.removeChild(clonedNode);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${data.agreement.agreementId}.pdf`);
  } catch (err) {
    console.error("PDF generation error:", err);
  }
};

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "1rem" }}>
      <div
        ref={invoiceRef}
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          overflow: "hidden",
          fontFamily: "sans-serif",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
       <div
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
          color: "#ffffff",
          padding: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left: Company Name */}
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", margin: 0 }}>SalesTruff</h1>

        {/* Right: Invoice details */}
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "1.25rem", margin: "0 0 0.25rem 0" }}>NO: {agreement.agreementId}</p>
          <p style={{ fontSize: "1rem", opacity: 0.9, margin: 0 }}>
            Date: {new Date(agreement.date).toLocaleDateString()}
          </p>
        </div>
      </div>
<div style={{ padding: "3rem", width: "100%" }}>
  {/* Bill To & From */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", marginBottom: "3rem", width: "100%" }}>
    {/* Bill To (Left) */}
    <div style={{ flex: 1 }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#374151", marginBottom: "0.5rem" }}>Bill To:</h2>
      <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>{agreement.to}</p>
      <p style={{ color: "#6b7280", margin: 0 }}>Email: {agreement.to}</p>
    </div>

    {/* From (Right) */}
    <div style={{ flex: 1, textAlign: "right" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#374151", marginBottom: "0.5rem" }}>From:</h2>
      <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>SalesTruff Pvt Ltd</p>
      <p style={{ color: "#6b7280", margin: "0.25rem 0" }}>+91-9304719585</p>
      <p style={{ color: "#6b7280", margin: 0 }}>Gurgaon, India</p>
    </div>
  </div>
          {/* Product Table */}
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", backgroundColor: "#1e40af", color: "#ffffff", fontWeight: "600", fontSize: "0.875rem", padding: "0.75rem 1rem" }}>
              <div>Description</div>
              <div style={{ textAlign: "center" }}>Qty</div>
              <div style={{ textAlign: "center" }}>Rate</div>
              <div style={{ textAlign: "right" }}>Total</div>
            </div>
            <div>
              {products.map((p) => (
                <div key={p._id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", fontSize: "0.875rem", color: "#111827", padding: "0.75rem 1rem", borderTop: "1px solid #e5e7eb" }}>
                  <div>{p.productName}</div>
                  <div style={{ textAlign: "center" }}>{p.quantity}</div>
                  <div style={{ textAlign: "center" }}>{p.price.toLocaleString("en-IN")}</div>
                  <div style={{ textAlign: "right" }}>{(p.price * p.quantity).toLocaleString("en-IN")}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
            <div style={{ backgroundColor: "#f9fafb", borderRadius: "0.5rem", padding: "1.5rem", width: "100%", maxWidth: "400px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500", color: "#374151" }}>
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "500", color: "#374151", marginTop: "0.5rem" }}>
                <span>Discount (%)</span>
                <input type="number" value={discountRate} onChange={e => setDiscountRate(Number(e.target.value))} style={{ width: "4rem", padding: "0.25rem", borderRadius: "0.25rem", border: "1px solid #d1d5db", textAlign: "right" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500", color: "#374151", marginTop: "0.5rem" }}>
                <span>Discount Amount</span>
                <span>- {discount.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "500", color: "#374151", marginTop: "0.5rem" }}>
                <span>GST (%)</span>
                <input type="number" value={gstRate} onChange={e => setGstRate(Number(e.target.value))} style={{ width: "4rem", padding: "0.25rem", borderRadius: "0.25rem", border: "1px solid #d1d5db", textAlign: "right" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500", color: "#374151", marginTop: "0.5rem" }}>
                <span>GST Amount</span>
                <span>+ {gst.toLocaleString("en-IN")}</span>
              </div>
              <hr style={{ margin: "0.5rem 0", borderColor: "#d1d5db" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: "#1e40af", fontSize: "1.125rem" }}>
                <span>Grand Total</span>
                <span>{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
         <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", marginTop: "3rem", width: "100%" }}>
      {/* Note (Left) */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#374151", marginBottom: "0.25rem" }}>Note:</h3>
        <p style={{ color: "#6b7280", margin: 0 }}>Thank you for your business!</p>
      </div>

      {/* Payment Information (Right) */}
      <div style={{ flex: 1, textAlign: "right" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#374151", marginBottom: "0.25rem" }}>Payment Information:</h3>
        <p style={{ color: "#6b7280", margin: "0.25rem 0" }}><span style={{ fontWeight: "600", color: "#111827" }}>Bank:</span> Axis Bank</p>
        <p style={{ color: "#6b7280", margin: "0.25rem 0" }}><span style={{ fontWeight: "600", color: "#111827" }}>A/C:</span> 1234567890</p>
        <p style={{ color: "#6b7280", margin: 0 }}><span style={{ fontWeight: "600", color: "#111827" }}>IFSC:</span> UTIB0001234</p>
      </div>
        </div>
              {/* Footer */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#111827", fontStyle: "italic" }}>Thank You!</h2>
        </div>
          </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            style={{
              margin: "1rem",
              backgroundColor: "#1e40af",
              color: "#ffffff",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
        </div>
  );
};

export default Invoice;

import { useParams, useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

const AgreementPage = () => {
  const { id } = useParams();
  const vendorSigPad = useRef({});
  const clientSigPad = useRef({});
  const [vendorSignature, setVendorSignature] = useState(null);
  const [clientSignature, setClientSignature] = useState(null);

  const handleClearVendor = () => {
    vendorSigPad.current.clear();
    setVendorSignature(null);
  };

  const handleClearClient = () => {
    clientSigPad.current.clear();
    setClientSignature(null);
  };

  const handleSaveVendor = () => {
    if (!vendorSigPad.current.isEmpty()) {
      const dataURL = vendorSigPad.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setVendorSignature(dataURL);
    } else {
      alert("Vendor must sign before saving!");
    }
  };

  const handleSaveClient = () => {
    if (!clientSigPad.current.isEmpty()) {
      const dataURL = clientSigPad.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setClientSignature(dataURL);
    } else {
      alert("Client must sign before saving!");
    }
  };
const handleSubmit = async () => {
  try {
    if (!vendorSignature || !clientSignature) {
      alert("Please save both signatures before submitting.");
      return;
    }

    const res = await axios.post(
      `http://localhost:7000/api/agreements/signatures/${id}`,
      {
        vendorSignature,
        clientSignature,
      }
    );

    alert("Signatures submitted successfully!");
    console.log("Saved Agreement:", res.data.agreement);
  } catch (error) {
    console.error("Error submitting signatures:", error);
    alert("Error submitting signatures. Please try again.");
  }
};
 return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-8">
     
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 sm:p-12 leading-relaxed text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Enterprise ERP Software Sale & Services Agreement
        </h1>
       

        {/* Clause Section Generator */}
        <Section
          title="1. Parties"
          content={
            <>
              This Agreement is entered into on [Date] between:
              <br />
              <strong>Supplier:</strong> [Vendor/Company Name], having its
              registered office at [Vendor Address] (hereinafter referred to as
              the 'Vendor').
              <br />
              <strong>Client:</strong> [Client Name], having its registered
              office at [Client Address] (hereinafter referred to as the
              'Client').
            </>
          }
        />

        <Section
          title="2. Definitions"
          content={
            <>
              <strong>ERP Software:</strong> The MERN-based CRM/ERP platform
              developed and provided by the Vendor… <br />
              <strong>Modules:</strong> Lead Management, Opportunities,
              Campaigns, Accounts, Cases, Reports, Analytics, Workflow
              Automation… <br />
              <strong>Services:</strong> Implementation, customization,
              integration, migration, training, and support services. <br />
              <strong>Documentation:</strong> User manuals, training material,
              technical documentation. <br />
              <strong>Go-Live Date:</strong> The date on which the ERP system
              becomes operational for the Client.
            </>
          }
        />

        <Section
          title="3. Scope of Agreement"
          content="The Vendor agrees to license, implement, and support the ERP Software for the Client. The Agreement covers licensing, customization, deployment, and ongoing support. Details of modules and scope are attached as Schedule A."
        />

        <Section
          title="4. License Grant & Restrictions"
          content="The Vendor grants the Client a non-exclusive, non-transferable license to use the ERP Software for internal business purposes, limited to the number of users and modules specified in Schedule A.
Restrictions: The Client shall not sublicense, resell, reverse engineer, or copy the software except as expressly permitted under this Agreement.
"/>

         <Section
          title="5. Implementation Services"
          content="The Vendor shall provide implementation services including configuration, customization, integration, data migration, and training. The detailed implementation plan with milestones is attached as Schedule B."
        />

        <Section
          title="6. Support & Maintenance"
          content="The Vendor shall provide ongoing support, bug fixes, and maintenance as per the Service Level Agreement (Schedule C). Support shall be available through [ticketing/email/phone]."
        />

     <Section
        title="7. Fees & Payment Terms"
        content={
          <>
          <div>
            <p>
              The Client agrees to pay the Vendor the fees outlined in Schedule D, including:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><span className="font-semibold">License Fees</span> (one-time or subscription)</li>
              <li><span className="font-semibold">Implementation Charges</span> (milestone-based)</li>
              <li><span className="font-semibold">Support & AMC Fees</span></li>
            </ul>
            <p className="mt-2">
              Payments are due within [X] days of invoice. Late payments attract interest at [X]% per month.
            </p>
            </div>
          </>
        }
      />

     <Section
          title="8. Delivery, Acceptance & Go-Live"
          content="Delivery shall be made via [cloud access/on-prem installation].
          Acceptance testing criteria shall be mutually agreed. The Go-Live Date shall be considered as the acceptance of software by the Client."/>

     <Section
          title="9. Client Responsibilities"
          content="The Client shall provide necessary infrastructure, data, and resources required for implementation. The Client shall appoint a project manager to coordinate with the Vendor and provide timely approvals."/>


     <Section
          title="10.Intellectual Property Rights"
          content="The ERP Software and all related IP rights remain the property of the Vendor. The Client owns all data entered into the system. Customizations done specifically for the Client shall be governed by Schedule E."/>

      <Section
          title="11. Confidentiality"
          content="Both parties agree to maintain confidentiality of all proprietary and sensitive information received during the term of this Agreement."/>
       <Section
          title="12. Warranties & Disclaimers"
          content="The Vendor warrants that the ERP Software will perform substantially as described in documentation. No warranty is provided for uninterrupted use or for errors arising from misuse or third-party systems."/>

       <Section
          title="13. Limitation of Liability"
          content="Vendor’s liability shall not exceed the total fees paid by the Client in the preceding 12 months. Vendor shall not be liable for indirect or consequential damages."/>

       <Section
          title="14. Term & Termination"
          content="This Agreement is valid from [Start Date] for a period of [X years] unless terminated earlier. Termination may occur in case of breach, insolvency, or non-payment. Upon termination, Client’s license shall cease, and Vendor shall return Client data in agreed format."/>

        <Section
          title="15. Indemnity"
          content="The Vendor indemnifies the Client against IP infringement claims. The Client indemnifies the Vendor against misuse or illegal use of the ERP Software."/>
         <Section
          title="16.Compliance"
          content="The Client shall use the ERP Software in compliance with applicable laws. The Vendor ensures compliance with data protection regulations including GDPR and local IT laws."/>
          <Section
          title="17.Force Majeure"
          content="Neither party shall be liable for delays caused by events beyond reasonable control, including natural disasters, internet outages, or government restrictions."/>
          <Section
          title="18.Dispute Resolution & Governing Law"
          content="Any disputes shall be resolved amicably. If unresolved, disputes shall be referred to arbitration as per [Arbitration Rules]. This Agreement shall be governed by the laws of [Jurisdiction]."/>
          <Section
          title="19. Miscellaneous"
          content="This Agreement constitutes the entire understanding between the parties and supersedes prior agreements. Any amendments shall be made in writing and signed by both parties."/>
<Section
  title="20. Signatures"
  content={
    <div className="mb-6">
      <h2>IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.</h2>
      <div className="mt-4 mb-4">
       <p className="font-medium mb-1">Vendor Signature:</p>
      <SignatureCanvas
        ref={vendorSigPad}
        penColor="black"
        canvasProps={{
          className:
            "border-2 w-full h-44 bg-gray-50 rounded shadow-inner",
        }}
      />
      <p>Authorized Signatory</p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleClearVendor}
          className="px-4 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleSaveVendor}
          className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Save Signature
        </button>
      </div>
      {vendorSignature && (
        <div className="mt-4">
          <p className="font-medium mb-2">Preview:</p>
          <img
            src={vendorSignature}
            alt="signature preview"
            className="border p-2 w-64"
          />
        </div>
      )}
      </div>
      
      <div>
      <p className="font-medium mb-1">Client Signature:</p>
      <SignatureCanvas
        ref={clientSigPad}
        penColor="black"
        canvasProps={{
          className:
            "border-2 w-full h-44 bg-gray-50 rounded shadow-inner",
        }}
      />
      <p>Authorized Signatory</p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleClearClient}
          className="px-4 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleSaveClient}
          className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Save Signature
        </button>
      </div>

      {clientSignature && (
        <div className="mt-4">
          <p className="font-medium mb-2">Preview:</p>
          <img
            src={clientSignature}
            alt="signature preview"
            className="border p-2 w-64"
          />
        </div>
      )}
    </div>
    </div>
  }
/>


      <div className="py-5 mb-5">
        <h2 className="text-lg font-semibold mb-2">Schedules</h2>
        <ol className="list-decimal list-inside leading-tight space-y-2 text-lg text-gray-700">
          <li>Schedule A – Software Modules & Features</li>
          <li>Schedule B – Implementation Plan & Milestones</li>
          <li>Schedule C – SLA & Support Matrix</li>
          <li>Schedule D – Payment Plan</li>
          <li>Schedule E – Customizations & Third-Party Licenses</li>
        </ol>
      </div>
  <div className="mb-10">
  <h2 className="text-lg font-semibold mb-1">Schedule A – Software Modules & Features</h2>

  <ul className="space-y-3">
    <li>
      <h3 className="font-semibold">Core CRM/ERP Modules</h3>
      <ul className="list-disc list-inside pl-5 space-y-1">
        <li>Lead & Opportunity Management</li>
        <li>Account & Contact Management</li>
        <li>Campaign & Marketing Automation</li>
        <li>Sales Forecasting & Pipeline</li>
        <li>Quotation & Proposal Management</li>
        <li>Orders, Invoices, and Billing</li>
      </ul>
    </li>

    <li>
      <h3 className="font-semibold">Customer Service</h3>
      <ul className="list-disc list-inside pl-5 space-y-1">
        <li>Case & Ticketing System</li>
        <li>SLA Tracking</li>
        <li>Knowledge Base & Self-Service</li>
      </ul>
    </li>

    <li>
      <h3 className="font-semibold">Analytics & Dashboards</h3>
      <ul className="list-disc list-inside pl-5 space-y-1">
        <li>Customizable Dashboards</li>
        <li>Reports (sales, pipeline, conversion, revenue)</li>
        <li>Predictive Analytics (AI-enabled)</li>
      </ul>
    </li>

    <li>
      <h3 className="font-semibold">Integrations</h3>
      <ul className="list-disc list-inside pl-5 space-y-1">
        <li>Email (Outlook/Gmail)</li>
        <li>WhatsApp/SMS connectors</li>
        <li>APIs for ERP integration (Accounting, HR, Inventory)</li>
      </ul>
    </li>

    <li>
      <h3 className="font-semibold">Admin & Security</h3>
      <ul className="list-disc list-inside pl-5 space-y-1">
        <li>Role-based Access Control</li>
        <li>Audit Logs</li>
        <li>SSO / OAuth2.0 / LDAP Integration</li>
      </ul>
    </li>
  </ul>
</div>
    
        <Schedule title="Schedule B – Implementation Plan & Milestones">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Milestone</th>
                  <th className="px-4 py-2 text-left">Deliverable</th>
                  <th className="px-4 py-2 text-left">Timeline</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Project Kickoff</td>
                  <td className="px-4 py-2">Sign-off on scope</td>
                  <td className="px-4 py-2">Week 1</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Requirement Gathering</td>
                  <td className="px-4 py-2">BRD</td>
                  <td className="px-4 py-2">Week 2–3</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Configuration & Setup</td>
                  <td className="px-4 py-2">Initial ERP setup, user provisioning</td>
                  <td className="px-4 py-2">Week 4–6</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Customization & Integration</td>
                  <td className="px-4 py-2">Custom workflows, API integration</td>
                  <td className="px-4 py-2">Week 7–10</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Data Migration</td>
                  <td className="px-4 py-2">Import of legacy CRM/ERP data</td>
                  <td className="px-4 py-2">Week 11–12</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">UAT (User Acceptance Test)</td>
                  <td className="px-4 py-2">Client testing & feedback</td>
                  <td className="px-4 py-2">Week 13</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Training</td>
                  <td className="px-4 py-2">Training	End-user & admin training sessions</td>
                  <td className="px-4 py-2">Week 14</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Go-Live</td>
                  <td className="px-4 py-2">Go-Live	Production deployment & acceptance</td>
                  <td className="px-4 py-2">Week 15</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Hypercare Support</td>
                  <td className="px-4 py-2">Hypercare Support	Post-Go-Live support period	30 Days</td>
                  <td className="px-4 py-2">30 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Schedule>

<div className="mb-10">
  <h2 className="text-lg font-bold mb-2">Schedule C – SLA & Support Matrix</h2>
  <ul className="list-disc ml-6 mb-4">
    <li>
      <span className="font-semibold">Support Hours:</span>
      9 AM – 6 PM (Mon–Fri) IST (Enterprise 24/7 support optional)
    </li>
  </ul>


  <p className="font-semibold mb-1">Severity Levels & Response Times:</p>
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-300 text-sm text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Severity</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
          <th className="border border-gray-300 px-4 py-2">Response Time</th>
          <th className="border border-gray-300 px-4 py-2">Resolution Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2 font-medium">Critical (P1)</td>
          <td className="border px-4 py-2">System down / business halted</td>
          <td className="border px-4 py-2">1 hour</td>
          <td className="border px-4 py-2">4 hours</td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-medium">High (P2)</td>
          <td className="border px-4 py-2">Major functionality issue</td>
          <td className="border px-4 py-2">4 hours</td>
          <td className="border px-4 py-2">1 business day</td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-medium">Medium (P3)</td>
          <td className="border px-4 py-2">Minor issue affecting limited users</td>
          <td className="border px-4 py-2">1 business day</td>
          <td className="border px-4 py-2">3 business days</td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-medium">Low (P4)</td>
          <td className="border px-4 py-2">Cosmetic / non-critical enhancement</td>
          <td className="border px-4 py-2">2 business days</td>
          <td className="border px-4 py-2">Next release cycle</td>
        </tr>
      </tbody>
    </table>
  </div>

  <ul className="list-disc ml-6 mt-4">
    <li>
      <span className="font-semibold">Support Channels: </span>
      Email, ticketing portal, phone hotline
    </li>
    <li>
      <span className="font-semibold">Upgrades: </span>
      Major version upgrades once a year; minor updates quarterly
    </li>
  </ul>
</div>

<div className="mb-10">
  <h2 className="text-lg font-bold mb-4">Schedule D – Payment Plan</h2>

  <ul className="list-disc ml-6 mb-4">
    <li>
      <span className="font-semibold">License Fees:</span>
      <ul className="list-disc ml-6 mt-1">
        <li>₹[X] per user/month (minimum [Y] users) OR ₹[Flat Rate] annually</li>
      </ul>
    </li>
  </ul>
  <ul className="list-disc ml-6 mb-4">
    <li>
      <span className="font-semibold">Implementation Charges:</span>
      <ul className="list-disc ml-6 mt-1">
        <li>Fixed Price: ₹[Amount]</li>
        <li>
          Payment linked to milestones in Schedule B 
          (e.g., 20% on signing, 30% after configuration, 
          30% post-UAT, 20% at Go-Live)
        </li>
      </ul>
    </li>
  </ul>
  <ul className="list-disc ml-6 mb-4">
    <li>
      <span className="font-semibold">Support & AMC Fees:</span>
      18% of license + implementation cost annually (renewable)
    </li>
  </ul>
  <ul className="list-disc ml-6">
    <li>
      <span className="font-semibold">Payment Terms:</span>
      <ul className="list-disc ml-6 mt-1">
        <li>Net [30] days from invoice</li>
        <li>Late payment interest: [1.5%] per month</li>
      </ul>
    </li>
  </ul>
</div>
<div className="mb-10">
  <h2 className="text-lg font-bold mb-4">Schedule E – Customizations & Third-Party Licenses</h2>
  <ul className="list-disc ml-6 mb-4">
    <li>
      <span className="font-semibold">Customizations:</span>
      <ul className="list-disc ml-6 mt-1">
        <li>Custom Reports & Dashboards specific to Client’s KPIs</li>
        <li>Workflow automation unique to Client’s sales process</li>
        <li>
          API-based integration with [Accounting System], [HR System], [Inventory System]
        </li>
      </ul>
    </li>
  </ul>
  <ul className="list-disc ml-6 mb-4">
    <li>
      <span className="font-semibold">Third-Party Software:</span>
      <ul className="list-disc ml-6 mt-1">
        <li>Database: MongoDB (open-source AGPL/enterprise license as applicable)</li>
        <li>Email API: SendGrid / AWS SES</li>
        <li>Payment Gateway API: Stripe / Razorpay</li>
      </ul>
    </li>
  </ul>
  <ul className="list-disc ml-6">
    <li>
      <span className="font-semibold">Ownership:</span>
      <ul className="list-disc ml-6 mt-1">
        <li>Vendor retains IP of ERP core platform</li>
        <li>Client retains ownership of its data and configurations</li>
      </ul>
    </li>
  </ul>
</div>

<div div className="flex justify-center"> 
  <button onClick={handleSubmit} className="w-2xs bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
    Submit
  </button>
</div>

        <div className="mt-2 pt-6 border-t text-sm text-gray-500 text-center">
          <p>
            This document is confidential and legally binding. <br />
            © {new Date().getFullYear()} SalesTruff. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
const Section = ({ title, content }) => (
  <section className="mb-8">
    <div>
    <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
    <p className="text-gray-700">{content}</p>
    </div>
  </section>
);

const Schedule = ({ title, items, children }) => (
  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
    {items ? (
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      children
    )}
  </section>
);

export default AgreementPage;
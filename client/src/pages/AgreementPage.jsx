import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AgreementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendAgreement = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:7000/api/agreements/send", {
        proposalId: id,
      });
      alert("Agreement Sent Successfully!");
      navigate(`/proposals/${id}`);
    } catch (err) {
      console.error("Error sending agreement:", err);
      alert("Failed to send agreement.");
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-8">
     
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 sm:p-12 leading-relaxed text-gray-800">
        <div className="fixed top-18 right-5 z-50">
        <button
          onClick={handleSendAgreement}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Agreement"}
        </button>
      </div>
        {/* Title */}
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
           The Client agrees to pay the Vendor the fees outlined in Schedule D, including:
           <ul className="list-disc ml-6 mt-2 space-y-1">
             <li><strong>License Fees</strong> (one-time or subscription)</li>
             <li><strong>Implementation Charges</strong> (milestone-based)</li>
             <li><strong>Support & AMC Fees</strong></li>
           </ul>
           <p className="mt-2">
             Payments are due within [X] days of invoice. Late payments attract interest at [X]% per month.
           </p>
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
            <>
              IN WITNESS WHEREOF, the parties have executed this Agreement on
              the date first written above.
              <br />
              <br />
              Vendor: _____________________ <br />
              Authorized Signatory
              <br />
              <br />
              Client: _____________________ <br />
              Authorized Signatory
            </>
          }
        />

        {/* Divider */}
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">
          Schedules
        </h2>

        {/* Schedule A */}
        <Schedule
          title="Schedule A – Software Modules & Features"
          items={[
            "Core CRM/ERP Modules: Lead & Opportunity Management, Accounts, Campaigns, Orders, Invoices",
            "Customer Service: Case & Ticketing System, SLA Tracking, Knowledge Base",
            "Analytics: Dashboards, Reports, Predictive Analytics",
            "Integrations: Email, WhatsApp, APIs",
            "Admin & Security: Role-based Access, Audit Logs, SSO",
          ]}
        />

        {/* Schedule B with Table */}
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
                {/* Add other milestones */}
              </tbody>
            </table>
          </div>
        </Schedule>

        {/* Schedule C */}
        <Schedule
          title="Schedule C – SLA & Support Matrix"
          items={[
            "Support Hours: 9 AM – 6 PM (Mon–Fri) IST",
            "Critical (P1) – Response 1hr, Resolution 4hrs",
            "High (P2) – Response 4hrs, Resolution 1 day",
            "Medium (P3) – Response 1 day, Resolution 3 days",
            "Low (P4) – Response 2 days, Resolution next release",
          ]}
        />

        {/* Schedule D */}
        <Schedule
          title="Schedule D – Payment Plan"
          items={[
            "License Fees: ₹[X]/user/month or flat rate annually",
            "Implementation Charges: milestone based",
            "Support & AMC: 18% annually",
            "Payment Terms: Net 30 days, 1.5% late fee",
          ]}
        />

        {/* Schedule E */}
        <Schedule
          title="Schedule E – Customizations & Third-Party Licenses"
          items={[
            "Custom Reports, Workflows, Integrations",
            "Third-party: MongoDB, SendGrid/AWS SES, Stripe/Razorpay",
            "Ownership: Vendor owns ERP core, Client owns data",
          ]}
        />

        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-center">
          <p>
            This document is confidential and legally binding. <br />
            © {new Date().getFullYear()} Your Company
          </p>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Section Component
const Section = ({ title, content }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </section>
);

// ✅ Reusable Schedule Component
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
import express from "express";
import nodemailer from "nodemailer";
import Proposal from "../models/Proposal.js";
import Contact from "../models/Contact.js";
import Opportunity from "../models/Opportunity.js";
import OpportunityProduct from "../models/OpportunityProduct.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/accept/:id", async (req, res) => {
  try {
    const { signature } = req.body;
    const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

    const proposal = await Proposal.findOneAndUpdate(
      { opportunityId: req.params.id },
      {
        status: "Accepted",
        signature,
        acceptedAt: new Date(),
        ipAddress,
      },
      { new: true }
    );

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json({
      message: "Proposal accepted successfully",
      proposal,
    });
  } catch (error) {
    console.error("Error accepting proposal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/send-proposal", async (req, res) => {
  const { proposalId } = req.body;

  try {
    const opportunity = await Opportunity.findById(proposalId);
    if (!opportunity) {
      return res
        .status(404)
        .json({ success: false, message: "Opportunity not found" });
    }
    const contact = await Contact.findOne({ accountId: opportunity.accountId });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "No contact found for this account" });
    }
    const clientEmail = contact.Email;

    // 3. Calculate grandTotal from opportunityproducts
    const products = await OpportunityProduct.find({
      opportunityId: proposalId,
    });
    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products found for this opportunity",
      });
    }

    const grandTotal = products.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0
    );

    const proposalLink = `http://localhost:5173/proposal/${proposalId}`;

    const proposal = new Proposal({
      opportunityId: proposalId,
      from: "SalesTruff Pvt Ltd",
      to: clientEmail,
      grandTotal,
      status: "Draft",
      proposalLink: proposalLink,
    });
    await proposal.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      subject: `Proposal from SalesTruff — ${
        opportunity.opportunityName || "Your Proposal"
      }`,
      text: `Hi ${
        contact.Name || "there"
      },\n\nYour proposal is ready. Open it here: ${proposalLink}\n\nGrand Total: ₹${
        proposal.grandTotal
      }\nStatus: ${proposal.status}\n\nRegards,\nSalesTruff Pvt Ltd`,
      html: `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      /* Mobile-friendly adjustments */
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 16px !important; }
        .content { padding: 20px !important; }
        .btn { width: 100% !important; display: block !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Helvetica, Arial, sans-serif; color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px;">
          <!-- Main container -->
          <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 18px rgba(20,20,20,0.06);">
            <!-- Header -->
            <tr>
              <td style="background:#0f1724; padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="text-align:center; vertical-align:middle;">
                    <!-- text logo -->
                    <div style="color:#ffffff; font-weight:700; font-size:18px;">
                      SalesTruff Pvt Ltd
                    </div>
                  </td>
                </tr>
              </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="content" style="padding:28px 32px;">
                <h2 style="margin:0 0 12px 0; font-weight:700; color:#0b1320; font-size:20px;">
                  Hi ${contact.Name || "there"},</h2>

                <p style="margin:0 0 18px 0; line-height:1.6; color:#445560;">
                  Your proposal for <strong>${
                    opportunity.opportunityName || "the project"
                  }</strong> is ready. Click the button below to view the full proposal and accept or comment.
                </p>

                <!-- Proposal summary card -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:18px 0; border:1px solid #e6e9ee; border-radius:6px;">
                  <tr>
                    <td style="padding:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="vertical-align:top;">
                            <div style="font-size:13px; color:#667685;">Grand Total</div>
                            <div style="font-size:18px; font-weight:700; color:#16a34amargin-top:6px;">₹ ${
                              proposal.grandTotal?.toLocaleString?.() ??
                              proposal.grandTotal
                            }</div>
                          </td>
                          <td align="right" style="vertical-align:top;">
                            <div style="font-size:13px; color:#667685;">Status</div>
                            <div style="font-size:14px; font-weight:600; margin-top:6px; color:${
                              proposal.status === "Draft"
                                ? "#b76b00"
                                : "#0f9d58"
                            };">
                              ${proposal.status}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- CTA button -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="margin:16px 0;">
                  <tr>
                    <td align="center">
                      <a href="${proposalLink}" target="_blank" class="btn" style="display:inline-block; padding:14px 24px; background:linear-gradient(90deg,#007bff,#0056b3); color:#ffffff; text-decoration:none; font-weight:bold; border-radius:6px; font-size:15px;">
                        View Proposal
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:18px 0 0 0; color:#667685; line-height:1.5;">
                  If you prefer, you can reply to this email with any questions or call us at <strong>+91-XXXXXXXXXX</strong>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#fafbfd; padding:18px 24px; font-size:12px; color:#98a2b3;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td>
                      <div style="margin-bottom:6px;">Regards,<br/>SalesTruff Pvt Ltd</div>
                      <div style="color:#b0bcc9;">123 Business Street, City · GSTIN: XX-XXXXXX</div>
                    </td>
                    <td align="right">
                      <div style="color:#9aa4b2;">Need help?</div>
                      <div style="margin-top:6px;"><a href="mailto:support@salestruff.com" style="color:#0b74de; text-decoration:none;">support@salestruff.com</a></div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Small print -->
          <div style="max-width:600px; margin-top:14px; color:#9aa4b2; font-size:12px;">
            If you did not expect this email, you can ignore it. This message was sent to <strong>${clientEmail}</strong>.
          </div>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
    });

    res.json({
      success: true,
      message: "Proposal link sent to " + clientEmail,
    });
  } catch (error) {
    console.error("Error sending proposal:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

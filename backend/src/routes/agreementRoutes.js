import express from "express";
import nodemailer from "nodemailer";
import Agreement from "../models/Agreement.js";
import Proposal from "../models/Proposal.js";
import Opportunity from "../models/Opportunity.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const agreements = await Agreement.find().sort({ createdAt: -1 });
    res.json(agreements);
  } catch (err) {
    console.error("Error fetching agreements:", err);
    res.status(500).json({ message: "Server error while fetching agreements" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id).lean();
    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    let account = null;

    // Find proposal linked to this agreement
    if (agreement.proposalId) {
      const proposal = await Proposal.findById(agreement.proposalId).lean();
      if (proposal && proposal.opportunityId) {
        const opportunity = await Opportunity.findById(
          proposal.opportunityId
        ).lean();
        if (opportunity && opportunity.accountId) {
          if (mongoose.Types.ObjectId.isValid(opportunity.accountId)) {
            account = await Account.findById(opportunity.accountId).lean();
          } else {
            account = await Account.findOne({
              accountId: opportunity.accountId,
            }).lean();
          }
        }
      }
    }

    res.json({ agreement, account });
  } catch (err) {
    console.error("Error fetching agreement:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signatures/:id", async (req, res) => {
  try {
    const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
    const { vendorSignature, clientSignature } = req.body;

    if (!vendorSignature || !clientSignature) {
      return res.status(400).json({ message: "Both signatures are required" });
    }

    const agreement = await Agreement.findOneAndUpdate(
      { proposalId: req.params.id },
      {
        vendorSignature,
        clientSignature,
        status: "Accepted",
        signedAt: new Date(),
        ipAddress,
      },
      { new: true }
    );

    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    res.json({
      message: "Signatures saved successfully",
      agreement,
    });
  } catch (error) {
    console.error("Error saving signatures:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/from-proposal/:proposalId", async (req, res) => {
  try {
    const { proposalId } = req.params;

    // 🔹 Proposal fetch with related opportunity
    const proposal = await Proposal.findById(proposalId).populate(
      "opportunityId"
    );
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const opportunity = proposal.opportunityId; // populated object

    // 🔹 Create Agreement
    const agreement = new Agreement({
      agreementId: `AGR-${Date.now()}`,
      proposalId: proposalId,
      to: proposal.to,
      grandTotal: proposal.grandTotal,
      ipAddress: req.ip,
      agreementLink: `http://localhost:5173/agreement/${proposalId}`,
      status: "Draft",
    });

    await agreement.save();

    // 🔹 Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔹 Professional Email Template
    const mailOptions = {
      from: `"SalesTruff Pvt Ltd" <${process.env.EMAIL_USER}>`,
      to: proposal.to,
      subject: "Agreement Sent - SalesTruff Pvt Ltd",
      html: `
        <div style="max-width:600px; margin:0 auto; font-family:Arial, sans-serif; background:#f4f6f8; padding:25px; border-radius:10px; border:1px solid #e0e0e0; color:#333;">

  <!-- Header -->
  <div style="background:linear-gradient(90deg,#0f1724,#1e293b); padding:20px; text-align:center; border-radius:8px 8px 0 0;">
    <h1 style="margin:0; font-size:22px; color:#ffffff;">SalesTruff Pvt Ltd</h1>
    <p style="margin:8px 0 0; font-size:14px; color:#cbd5e1;">Agreement Notification</p>
  </div>

  <!-- Body -->
  <div style="background:#ffffff; padding:25px; border-radius:0 0 8px 8px;">
    <h2 style="font-size:18px; margin:0 0 15px; color:#0f1724;">Dear Client,</h2>

    <p style="font-size:15px; line-height:1.7; margin:0 0 12px; color:#444;">
      You have received an agreement for your proposal 
      <strong style="color:#007bff;">${proposal.proposalId}</strong>.
    </p>

    <div style="background:#f9fafb; padding:15px; border-radius:6px; border:1px solid #e5e7eb; margin-bottom:15px;">
      <p style="margin:0; font-size:14px; line-height:1.6; color:#333;">
        <strong>Opportunity:</strong> ${
          opportunity?.opportunityName || "-"
        } <br/>
        <strong>Company:</strong> ${opportunity?.Company || "-"} <br/>
        <strong>Account ID:</strong> ${opportunity?.accountId || "-"} <br/>
        <strong>Total Amount:</strong> <span style="color:#16a34a; font-weight:bold;">₹${
          proposal.grandTotal
        }</span>
      </p>
    </div>

    <p style="font-size:15px; line-height:1.6; margin:0 0 18px; color:#444;">
      Please click the button below to view and sign the agreement:
    </p>

    <!-- Button -->
    <div style="text-align:center; margin-bottom:20px;">
      <a href="${agreement.agreementLink}" 
         style="display:inline-block; padding:14px 24px; background:linear-gradient(90deg,#007bff,#0056b3); color:#ffffff; text-decoration:none; font-weight:bold; border-radius:6px; font-size:15px;">
         View Agreement
      </a>
    </div>

    <p style="font-size:13px; color:#666; margin:0; text-align:center;">
      If you have any questions, feel free to contact us.
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align:center; font-size:12px; color:#888; margin-top:20px;">
    <p style="margin:0;">Regards,</p>
    <p style="margin:0; font-weight:bold; color:#0f1724;">SalesTruff Pvt Ltd</p>
  </div>

</div>

      `,
    };

    // 🔹 Send Mail
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Agreement created & email sent",
      agreement,
    });
  } catch (err) {
    console.error("Error creating agreement:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

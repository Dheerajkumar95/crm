import express from "express";
import Agreement from "../models/Agreement.js";
import Proposal from "../models/Proposal.js"; // so we can fetch client email
import nodemailer from "nodemailer";
const router = express.Router();
router.post("/send", async (req, res) => {
  try {
    const { proposalId } = req.body;

    if (!proposalId) {
      return res.status(400).json({ message: "Proposal ID is required" });
    }

    // 🔎 Get proposal (to find client email, total, etc.)
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const clientEmail = "dheerajk35973@gmail.com";
    const agreementLink = `http://localhost:5173/agreement/${proposalId}`;

    // 📝 Save new agreement in DB
    const newAgreement = new Agreement({
      proposalId,
      agreementLink,
      status: "Sent",
      sentAt: new Date(),
      ipAddress: req.ip,
    });

    await newAgreement.save();

    // 📩 Setup Gmail Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dheerajk35973@gmail.com", // your email
        pass: "yuma unch fwbn uyhh", // your app password
      },
    });

    // 📩 Send Agreement Email
    await transporter.sendMail({
      from: "dheerajk35973@gmail.com",
      to: clientEmail,
      subject: "Your Agreement",
      html: `
        <h2>Dear Client,</h2>
        <p>Please review your agreement at the link below:</p>
        <p><a href="${agreementLink}" target="_blank">${agreementLink}</a></p>
        <br/>
        <p>Regards,<br/>SalesTruff Pvt Ltd</p>
      `,
    });

    res.json({
      success: true,
      message: "Agreement link sent to " + clientEmail,
      agreement: newAgreement,
    });
  } catch (error) {
    console.error("Error sending agreement:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id).populate(
      "proposalId"
    );

    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    res.json(agreement);
  } catch (error) {
    console.error("Error fetching agreement:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

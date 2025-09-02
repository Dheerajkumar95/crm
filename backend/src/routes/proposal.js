import express from "express";
import nodemailer from "nodemailer";
import Proposal from "../models/Proposal.js";
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
    const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip; // ✅ Real IP

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
    const clientEmail = "dheerajk35973@gmail.com";
    const proposalLink = `http://localhost:5173/proposal/${proposalId}`;

    const proposal = new Proposal({
      opportunityId: proposalId,
      to: clientEmail,
      grandTotal: 154200,
      status: "Draft",
      proposalLink: proposalLink,
    });
    await proposal.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dheerajk35973@gmail.com",
        pass: "yuma unch fwbn uyhh",
      },
    });

    await transporter.sendMail({
      from: "dheerajk35973@gmail.com",
      to: clientEmail,
      subject: "Your Proposal",
      html: `
        <h2>Dear  Dheeraj,</h2>
        <p>Please check your proposal at the link below:</p>
        <p><a href="${proposalLink}" target="_blank">${proposalLink}</a></p>
        <br/>
        <p>Regards,<br/>SalesTruff Pvt Ltd</p>
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

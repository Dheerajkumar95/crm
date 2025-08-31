// routes/proposal.js
import express from "express";
import Proposal from "../models/Proposal.js";

const router = express.Router();

// Generate Proposal
router.post("/generate", async (req, res) => {
  const { opportunityId } = req.body;

  // yahan se opportunity aur product fetch karke proposal create karo
  const newProposal = new Proposal({
    opportunityId,
    products: [], // opportunity se product fetch karke yahan store karna
    company: {}, // company details
    client: {}, // client details
    totalAmount: 0,
  });

  await newProposal.save();

  res.json({ proposalId: newProposal._id });
});

// Accept Proposal with signature
router.post("/accept/:id", async (req, res) => {
  try {
    const { signature } = req.body;
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "Accepted",
        signature,
        acceptedAt: new Date(),
        ipAddress,
      },
      { new: true }
    );

    res.json({ success: true, proposal });
  } catch (err) {
    res.status(500).json({ error: "Error accepting proposal" });
  }
});

export default router;

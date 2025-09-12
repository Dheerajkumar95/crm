// routes/invoice.js
import express from "express";
import Agreement from "../models/Agreement.js";
import Proposal from "../models/Proposal.js";
import Product from "../models/OpportunityProduct.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get Agreement
    const agreement = await Agreement.findById(id);
    if (!agreement)
      return res.status(404).json({ message: "Agreement not found" });

    // 2. Get Proposal linked to Agreement
    const proposal = await Proposal.findById(agreement.proposalId);
    if (!proposal)
      return res.status(404).json({ message: "Proposal not found" });

    // 3. Get Products linked by opportunityId
    const products = await Product.find({
      opportunityId: proposal.opportunityId,
    });

    res.json({
      agreement,
      proposal,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

// routes/agreement.js
import express from "express";
import Agreement from "../models/Agreement.js";
import { generateAgreementPDF } from "../utils/pdf.js";
import { sendEmail, sendWhatsApp } from "../utils/notification.js";

const router = express.Router();

// STEP 4: Accept Agreement (Final Signed)
router.post("/:id/accept", async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id);
    agreement.status = "Signed";
    await agreement.save();

    // Generate final PDF
    const pdfPath = await generateAgreementPDF(agreement);

    // Send to client
    await sendEmail(agreement.clientId, pdfPath);
    await sendWhatsApp(agreement.clientId, pdfPath);

    res.json({ agreement, pdf: pdfPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

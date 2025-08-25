import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
const router = express.Router();
import {
  createLead,
  getLeads,
  convertLeads,
  importLeads,
  getSingleLead,
  updateLead,
} from "../controllers/leadController.js";
const upload = multer({ storage: multer.memoryStorage() });
router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getSingleLead);
router.put("/:id", updateLead);
router.post("/convert", convertLeads);
router.post("/import-leads", upload.single("file"), importLeads);
router.post("/messages/send", upload.array("attachments"), async (req, res) => {
  try {
    const { from, to, cc, bcc, subject, html, leadId, relatedId, relatedType } =
      req.body;

    const transporter = nodemailer.createTransport({});

    const attachments = (req.files || []).map((f) => ({
      filename: f.originalname,
      content: f.buffer,
    }));

    await transporter.sendMail({
      from,
      to,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject,
      html,
      attachments,
    });

    // Optionally: save message in DB related to leadId + related record
    // await Message.create({ leadId, relatedId, relatedType, from, to, subject, html, attachmentsMeta: ... });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "SEND_FAILED" });
  }
});
export default router;
